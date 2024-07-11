const TitleofPoll = require('../models/titleofpoll');
const User = require('../models/user');
const { db } = require('../configs/dbPolls');

const createPoll = async (req, res) => {
    console.log(req.body);
    try {
        const { Title, UserID } = req.body;

        const userExists = await User.checkUserExists(UserID);
        if (!userExists) {
            return res.status(400).json({
                message: 'UserID không tồn tại',
            });
        }

        const query = `
            INSERT INTO Polls (Title, UserID, CreateAt)
            VALUES (?, ?, CURRENT_TIMESTAMP)
        `;
        await db.execute(query, [Title, UserID]);

        return res.status(200).json({
            message: 'Create successfully',
        });
    } catch (error) {
        console.log('Create failed', error);
        return res.status(500).json({
            message: 'Error',
            error: error.message,
        });
    }
};

const updatePoll = async (req, res) => {
    console.log(req.body);
    try {
        const { PollID, UserID, newTitle } = req.body;

        const result = await TitleofPoll.updatePoll(PollID, UserID, newTitle);

        if (result.affectedRows === 0) {
            return res.status(403).json({
                message: 'Unauthorized or poll not found',
            });
        }

        return res.status(200).json({
            message: 'Poll updated successfully',
        });
    } catch (error) {
        console.log('Update poll failed', error);
        return res.status(500).json({
            message: 'Error',
            error: error.message,
        });
    }
};
module.exports = {
    createPoll,
    updatePoll
};
