"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/votes'),
  createOption = _require.createOption,
  deleteOption = _require.deleteOption,
  updateVote = _require.updateVote,
  getVote = _require.getVote;
router.post('/create', createOption);
router["delete"]('/delete/:OptionID', deleteOption);
router.put('/update', updateVote);
router.get('/get/:PollID', getVote);
module.exports = router;