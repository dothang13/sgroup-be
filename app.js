var express = require('express');
const bodyParser = require("body-parser");
const fs = require("fs");
var app = express();

const users = require("./users.json");

app.use(bodyParser.json());
const writeData = (data) => {
  fs.writeFileSync("users.json", JSON.stringify(data, null, 2));
};

app.get('/api/users/', (req, res) => {
  res.send(users);
});

app.get('/api/users/:ab/:ac/', (req, res) => {
  const usersId = parseInt(req.params.id);
  const user = users.find((user) =>  user.id === usersId);
  res.send(user);
});

app.post('/api/users/', (req, res) => {
  const newItem = req.body;
  newItem.id = users.length ? users[users.length - 1].id + 1 : 1;
  console.log(users);
  users.push(newItem);
  writeData(users);
  res.status(201).send(users);
});

app.put('/api/users/:id/', (req,res) =>{
  const updatedItem = req.body;
  const usersId = parseInt(req.params.id);
  const findIndex = users.findIndex((user) => user.id === usersId);
  users[findIndex] = updatedItem;
  users[findIndex].id = usersId;
  writeData(users);
  res.send(updatedItem);
});

app.delete("/api/users/:id/", (req, res) => {
  const usersId = parseInt(req.params.id);
  const findIndex = users.findIndex((user) => user.id === usersId);
  users.splice(findIndex, 1);
  writeData(users);
  res.send({ message: "Deleted succesfully" });
});

app.listen(3000, function () {
  console.log('Example app listening on http://localhost:3000/');
});