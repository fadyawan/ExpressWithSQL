const db = require('../models');

exports.createBooking = async (req, res) => {
    const { Customer_ID, Package_ID, Date_Start, All_Inclusive, Activities } = req.body;

    try {
        const holidayPackage = await db.HolidayPackage.findByPk(Package_ID);
        if (!holidayPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }

        const Number_Of_Nights = holidayPackage.Number_Of_Nights;
        const dateStart = new Date(Date_Start);
        const dateEnd = new Date(dateStart);
        dateEnd.setDate(dateEnd.getDate() + Number_Of_Nights);

        const newBooking = await db.Booking.create({
            Customer_ID,
            Package_ID,
            Date_Start: dateStart,
            Date_End: dateEnd,
            All_Inclusive
        });

        if (Activities && Activities.length > 0) {
            const activityPromises = Activities.map(activity => {
                return db.Activity.create({
                    Activity_Type: activity.Activity_Type,
                    Hotel_ID: holidayPackage.Hotel_ID,
                    For_Kids: activity.For_Kids,
                    Booking_ID: newBooking.ID
                });
            });
            await Promise.all(activityPromises);
        }

        res.status(201).json({ message: 'Booking created successfully', Booking_ID: newBooking.ID });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'An error occurred while creating the booking' });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await db.Booking.findAll({
            include: [
                {
                    model: db.Activity,
                    attributes: ['Activity_Type', 'Hotel_ID', 'For_Kids']
                }
            ]
        });
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'An error occurred while retrieving the bookings' });
    }
};

exports.getBookingById = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await db.Booking.findByPk(id, {
            include: [
                {
                    model: db.Activity,
                    attributes: ['Activity_Type', 'Hotel_ID', 'For_Kids']
                }
            ]
        });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (error) {
        console.error('Error fetching booking by ID:', error);
        res.status(500).json({ message: 'An error occurred while retrieving the booking' });
    }
};

exports.editBooking = async (req, res) => {
    const { id } = req.params;
    const { Customer_ID, Package_ID, Date_Start, All_Inclusive, Activities } = req.body;

    try {
        const holidayPackage = await db.HolidayPackage.findByPk(Package_ID);
        if (!holidayPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }

        const Number_Of_Nights = holidayPackage.Number_Of_Nights;
        const dateEnd = new Date(Date_Start);
        dateEnd.setDate(dateEnd.getDate() + Number_Of_Nights);

        const [updated] = await db.Booking.update({
            Customer_ID,
            Package_ID,
            Date_Start,
            Date_End: dateEnd,
            All_Inclusive
        }, {
            where: { ID: id }
        });

        if (updated) {
            await db.Activity.destroy({ where: { Hotel_ID: holidayPackage.Hotel_ID } });

            if (Activities && Activities.length > 0) {
                const activityPromises = Activities.map(activity => {
                    return db.Activity.create({
                        Activity_Type: activity.Activity_Type,
                        Hotel_ID: holidayPackage.Hotel_ID,
                        For_Kids: activity.For_Kids,
                        Booking_ID: id
                    });
                });
                await Promise.all(activityPromises);
            }

            res.status(200).json({ message: 'Booking updated successfully' });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ message: 'An error occurred while updating the booking' });
    }
};

exports.deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await db.Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        await db.Activity.destroy({
            where: {
                Booking_ID: id
            }
        });

        await db.Booking.destroy({
            where: { ID: id }
        });

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'An error occurred while deleting the booking' });
    }
};
