const db = require('../config/db');

exports.createBooking = (req, res) => {
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

    const bookingQuery = `
      INSERT INTO Booking (Customer_ID, Package_ID, Date_Start, Date_End, All_Inclusive) 
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(bookingQuery, [Customer_ID, Package_ID, Date_Start, Date_End, All_Inclusive], (err, bookingResult) => {
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
              res.status(201).send({ bookingId: bookingResult.insertId });
            }
          });
        });
      } else {
        res.status(201).send({ bookingId: bookingResult.insertId });
      }
    });
  });
};

exports.getAllBookings = (req, res) => {
  const query = `
    SELECT 
      Booking.ID, 
      Booking.Customer_ID, 
      Booking.Package_ID, 
      Booking.Date_Start, 
      Booking.Date_End, 
      Booking.All_Inclusive, 
      Customer.First_Name, 
      Customer.Surname, 
      Holiday_Package.Name AS Package_Name, 
      Hotel.Name AS Hotel_Name
    FROM Booking
    JOIN Customer ON Booking.Customer_ID = Customer.ID
    JOIN Holiday_Package ON Booking.Package_ID = Holiday_Package.ID
    JOIN Hotel ON Holiday_Package.Hotel_ID = Hotel.ID
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(200).json(results);
  });
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
