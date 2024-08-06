var express = require("express");
var mysql = require("mysql2");
var bodyParser = require('body-parser');
var path = require('path');
var authRoutes = require(path.join(__dirname, 'src/routes/auth'));
var pollsRoutes = require(path.join(__dirname, 'src/routes/polls'));
var votesRoutes = require(path.join(__dirname, 'src/routes/votes'));
var uploadProfilePicture = require(path.join(__dirname, 'src/upload-express/server'));
var app = express();
var dbSGRVote = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123@Thang',
  database: 'SGRVOTE'
});
var dbSGr = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123@Thang',
  database: 'SGr'
});
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
dbSGRVote.connect(function (error) {
  if (error) {
    console.log("SGRVOTE DB connection error:", error);
  } else {
    console.log("MYSQL CONNECTED to SGRVOTE...");
  }
});
dbSGr.connect(function (error) {
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
// app.get('/abc', (req, res) =>{
//     res.send("Hello World!!!");
// })
var PORT = 3000;
app.listen(PORT, function () {
  console.log("Server started on Port ".concat(PORT));
});
