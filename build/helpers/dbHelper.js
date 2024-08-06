"use strict";

var getOne = function getOne(_ref) {
  var db = _ref.db,
    query = _ref.query,
    params = _ref.params;
  return new Promise(function (resolve, reject) {
    db.query(query, params, function (error, results) {
      if (error) {
        return reject(error);
      }
      resolve(results[0]);
    });
  });
};
var updateOne = function updateOne(_ref2) {
  var db = _ref2.db,
    query = _ref2.query,
    params = _ref2.params;
  return new Promise(function (resolve, reject) {
    db.query(query, params, function (error, results) {
      if (error) {
        return reject(error);
      }
      resolve(results.affectedRows > 0);
    });
  });
};
module.exports = {
  getOne: getOne,
  updateOne: updateOne
};