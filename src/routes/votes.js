const express = require('express');
const router = express.Router();
const { createOption, deleteOption, updateVote } = require('../controllers/votes');

router.post('/create', createOption);
router.delete('/delete/:OptionID', deleteOption);
router.put('/update', updateVote);

module.exports = router;
