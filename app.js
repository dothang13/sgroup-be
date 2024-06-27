const userService = require('./src/services/user.service');
const excute = async () => {
    const users = await userService.getAllUsers()
    console.log(users);
    const username = "";
}

excute();























// var express = require('express');
// const bodyParser = require("body-parser");
// const fs = require("fs");
// var app = express();

// const users = require("./users.json");

// app.use(bodyParser.json());

// const writeData = (data) => {
//   fs.writeFileSync("users.json", JSON.stringify(data, null, 2));
// };

// const validateNewUser = (req, res, next) => {
//   const { name, email } = req.body;
//   if (!name || !email) {
//     return res.status(400).send({ message: "Name and email are required" });
//   }
//   next();
// };

// app.get('/api/users/', (req, res) => {
//   res.send(users);
// });

// app.get('/api/users/:id/', (req, res) => {
//   const usersId = parseInt(req.params.id);
//   const user = users.find((user) => user.id === usersId);
//   if (user) {
//     res.send(user);
//   } else {
//     res.status(404).send({ message: "User not found" });
//   }
// });

// app.post('/api/users/', validateNewUser, (req, res) => {
//   const newItem = req.body;
//   newItem.id = users.length ? users[users.length - 1].id + 1 : 1;
//   users.push(newItem);
//   writeData(users);
//   res.status(201).send(newItem);
// });

// app.put('/api/users/:id/', (req, res) => {
//   const updatedItem = req.body;
//   const usersId = parseInt(req.params.id);
//   const findIndex = users.findIndex((user) => user.id === usersId);
//   if (findIndex === -1) {
//     return res.status(404).send({ message: "User not found" });
//   }
//   users[findIndex] = updatedItem;
//   users[findIndex].id = usersId;
//   writeData(users);
//   res.send(updatedItem);
// });

// app.delete("/api/users/:id/", (req, res) => {
//   const usersId = parseInt(req.params.id);
//   const findIndex = users.findIndex((user) => user.id === usersId);
//   if (findIndex === -1) {
//     return res.status(404).send({ message: "User not found" });
//   }
//   users.splice(findIndex, 1);
//   writeData(users);
//   res.send({ message: "Deleted successfully" });
// });

// app.listen(3000, function () {
//   console.log('Example app listening on http://localhost:3000/');
// });

