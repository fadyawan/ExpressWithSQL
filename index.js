const express = require('express');

// const app = express();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'F@WaT2012',
    database: 'hotelservice',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// pool.getConnection((err, connection) => {
//     if (err) {
//         console.error('Error connecting to database:', err);
//         return;
//     }
//     console.log('Connected to MySQL database successfully!');
//     connection.release();
// });

pool.query(`SELECT * FROM hotelservice.location;`, (err, result, fields) => {
    if (err) {
        return console.log(err)
    }
    return console.log(result)
})

// pool.end((err) => {
//     if (err) {
//         console.error('Error closing pool:', err);
//         return;
//     }
//     console.log('Pool closed');
// });

// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });
