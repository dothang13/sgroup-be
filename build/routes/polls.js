"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/polls'),
  createPoll = _require.createPoll,
  updatePoll = _require.updatePoll;
router.post('/create', createPoll);
router.put('/update/:PollID', updatePoll);
module.exports = router;