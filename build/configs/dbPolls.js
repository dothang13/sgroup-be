"use strict";

var mysql = require('mysql2/promise');
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123@Thang',
  database: 'SGRVOTE'
});
module.exports = {
  db: db
};