const express = require('express');
const router = express.Router();
const { createOption, deleteOption, updateVote, getVote } = require('../controllers/votes');

router.post('/create', createOption);
router.delete('/delete/:OptionID', deleteOption);
router.put('/update', updateVote);
router.get('/get/:PollID', getVote);

module.exports = router;
