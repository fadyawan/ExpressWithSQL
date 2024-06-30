const db = require('../config/db');

exports.createBooking = async (req, res) => {
    const { Customer_ID, Package_ID, Date_Start, All_Inclusive, Activities } = req.body;

    try {
        const [packageResult] = await db.query('SELECT Number_Of_Nights FROM Holiday_Package WHERE ID = ?', [Package_ID]);
        if (packageResult.length === 0) {
            return res.status(404).json({ message: 'Package not found' });
        }
        const Number_Of_Nights = packageResult[0].Number_Of_Nights;

        const dateStart = new Date(Date_Start);
        const dateEnd = new Date(dateStart);
        dateEnd.setDate(dateEnd.getDate() + Number_Of_Nights);

        const [bookingResult] = await db.query(
            'INSERT INTO Booking (Customer_ID, Package_ID, Date_Start, Date_End, All_Inclusive) VALUES (?, ?, ?, ?, ?)',
            [Customer_ID, Package_ID, Date_Start, dateEnd, All_Inclusive]
        );

        const Booking_ID = bookingResult.insertId;
        if (Activities && Activities.length > 0) {
            const activityPromises = Activities.map(activity => {
                return db.query(
                    'INSERT INTO Activity (Activity_Type, Hotel_ID, For_Kids) VALUES (?, (SELECT Hotel_ID FROM Holiday_Package WHERE ID = ?), ?)',
                    [activity.Activity_Type, Package_ID, activity.For_Kids]
                );
            });

            await Promise.all(activityPromises);
        }

        res.status(201).json({ message: 'Booking created successfully', Booking_ID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the booking' });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        console.log('hello')
        const [bookings] = await db.query(`
            SELECT 
                b.ID AS Booking_ID,
                b.Customer_ID,
                b.Package_ID,
                b.Date_Start,
                b.Date_End,
                b.All_Inclusive,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'Activity_Type', a.Activity_Type,
                        'Hotel_ID', a.Hotel_ID,
                        'For_Kids', a.For_Kids
                    )
                ) AS Activities
            FROM 
                Booking b
                LEFT JOIN Activity a ON a.Hotel_ID = (SELECT Hotel_ID FROM Holiday_Package WHERE ID = b.Package_ID)
            GROUP BY 
                b.ID
        `);

        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving the bookings' });
    }
};

exports.getBookingById = async (req, res) => {
    const { id } = req.params;
    console.log('meowmeow')
    
    try {
        const [booking] = await db.query(`
            SELECT 
                b.ID AS Booking_ID,
                b.Customer_ID,
                b.Package_ID,
                b.Date_Start,
                b.Date_End,
                b.All_Inclusive,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'Activity_Type', a.Activity_Type,
                        'Hotel_ID', a.Hotel_ID,
                        'For_Kids', a.For_Kids
                    )
                ) AS Activities
            FROM 
                Booking b
                LEFT JOIN Activity a ON a.Hotel_ID = (SELECT Hotel_ID FROM Holiday_Package WHERE ID = b.Package_ID)
            WHERE 
                b.ID = ?
            GROUP BY 
                b.ID
        `, [id]);

        if (booking.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(booking[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving the booking' });
    }
};

exports.editBooking = (req, res) => {
    const { id } = req.params;
    const { Customer_ID, Package_ID, Date_Start, All_Inclusive, Activities } = req.body;

    const packageQuery = 'SELECT Number_Of_Nights, Hotel_ID FROM Holiday_Package WHERE ID = ?';
    db.query(packageQuery, [Package_ID], (err, packageResults) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (packageResults.length === 0) {
            return res.status(404).send({ message: 'Package not found' });
        }

        const { Number_Of_Nights, Hotel_ID } = packageResults[0];
        const Date_End = new Date(Date_Start);
        Date_End.setDate(Date_End.getDate() + Number_Of_Nights);

        const updateBookingQuery = `
            UPDATE Booking 
            SET Customer_ID = ?, Package_ID = ?, Date_Start = ?, Date_End = ?, All_Inclusive = ? 
            WHERE ID = ?
        `;
        db.query(updateBookingQuery, [Customer_ID, Package_ID, Date_Start, Date_End, All_Inclusive, id], (err, bookingResult) => {
            if (err) {
                return res.status(500).send(err);
            }

            const deleteActivitiesQuery = 'DELETE FROM Activity WHERE Hotel_ID = (SELECT Hotel_ID FROM Holiday_Package WHERE ID = ?)';
            db.query(deleteActivitiesQuery, [Package_ID], (err, deleteResult) => {
                if (err) {
                    return res.status(500).send(err);
                }

                if (Activities && Activities.length > 0) {
                    Activities.forEach((activity, index) => {
                        const activityQuery = `
                            INSERT INTO Activity (Activity_Type, Hotel_ID, For_Kids) 
                            VALUES (?, ?, ?)
                        `;
                        db.query(activityQuery, [activity.Activity_Type, Hotel_ID, activity.For_Kids], (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            if (index === Activities.length - 1) {
                                res.status(200).send({ message: 'Booking updated successfully' });
                            }
                        });
                    });
                } else {
                    res.status(200).send({ message: 'Booking updated successfully' });
                }
            });
        });
    });
};

exports.deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM Activity WHERE Hotel_ID = (SELECT Hotel_ID FROM Holiday_Package WHERE ID = (SELECT Package_ID FROM Booking WHERE ID = ?))', [id]);
        await db.query('DELETE FROM Booking WHERE ID = ?', [id]);

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the booking' });
    }
};
