"use strict";

var express = require("express");
var path = require("path");
var multer = require("multer");
var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + '-' + file.originalname); // Thấy ảnh trong vs code
  }
});
var maxSize = 1 * 1000 * 1000;
var upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize
  },
  fileFilter: function fileFilter(req, file, cb) {
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: File upload only supports the " + "following filetypes - " + filetypes);
  }
}).single("mypic");
app.get("/", function (req, res) {
  res.render("Signup");
});
app.post("/uploadProfilePicture", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("Success, Image uploaded!");
    }
  });
});
app.listen(5000, function (error) {
  if (error) throw error;
  console.log("Server created Successfully on PORT 5000");
});