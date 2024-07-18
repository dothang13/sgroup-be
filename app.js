const express = require("express");
const mysql = require("mysql2");
const bodyParser = require('body-parser'); 
const authRoutes = require('./src/routes/auth');
const pollsRoutes = require('./src/routes/polls');
const votesRoutes = require('./src/routes/votes');
const uploadProfilePicture = require('./src/upload-express/server');

const app = express();

const dbSGRVote = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123@Thang',
    database: 'SGRVOTE'
});

const dbSGr = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123@Thang',
    database: 'SGr'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dbSGRVote.connect((error) => {
    if (error) {
        console.log("SGRVOTE DB connection error:", error);
    } else {
        console.log("MYSQL CONNECTED to SGRVOTE...");
    }
});

dbSGr.connect((error) => {
    if (error) {
        console.log("SGr DB connection error:", error);
    } else {
        console.log("MYSQL CONNECTED to SGr...");
    }
});

app.use('/auth', authRoutes);
app.use('/polls', pollsRoutes);
app.use('/votes', votesRoutes);
// app.use('/uploadProfilePicture', uploadProfilePicture);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`);
});