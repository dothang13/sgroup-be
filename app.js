const express = require("express");
const mysql = require("mysql2");
const bodyParser = require('body-parser'); 

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123@Thang',
    database: 'SGr'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MYSQL CONNECTED...");
    }
});

app.use('/auth', require('./src/routes/auth'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`);
});
