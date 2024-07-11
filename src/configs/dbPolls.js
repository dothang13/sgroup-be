const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123@Thang',
    database: 'SGRVOTE'
});

module.exports = { db };
