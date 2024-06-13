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

module.exports = pool.promise();
