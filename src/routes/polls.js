const express = require('express');
const router = express.Router();
const { createPoll, updatePoll } = require('../controllers/polls');

router.post('/create', createPoll);
router.put('/update/:PollID', updatePoll);

module.exports = router;
