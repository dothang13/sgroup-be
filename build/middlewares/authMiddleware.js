"use strict";

var jwt = require("jsonwebtoken");
var secretKey = "your_secret_key";
var verifyToken = function verifyToken(req, res, next) {
  var token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided"
    });
  }
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token"
      });
    }
    req.userId = decoded.id;
    next();
  });
};
module.exports = {
  verifyToken: verifyToken
};