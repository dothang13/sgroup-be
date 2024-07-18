const Opts = require('../models/opts');
const { db } = require('../configs/dbPolls');

const createOption = async (req, res) => {
    console.log(req.body);
    try {
        const { Content, PollID, UserID } = req.body;

        await Opts.createOption({
            Content: Content,
            PollID: PollID,
            UserID: UserID
        });

        return res.status(200).json({
            message: 'Option created successfully',
        });
    } catch (error) {
        console.log('Create option failed', error);
        return res.status(500).json({
            message: 'Error',
            error: error.message,
        });
    }
};

const deleteOption = async (req, res) => {
    const { OptionID } = req.params;
    try {
        await Opts.deleteOption(OptionID);
        return res.status(200).json({
            message: 'Option deleted successfully',
        });
    } catch (error) {
        console.log('Delete option failed', error);
        return res.status(500).json({
            message: 'Error',
            error: error.message,
        });
    }
};

const updateVote = async (req, res) => {
    console.log(req.body);
    try {
        const { UserID, OptionID, PollID } = req.body;

        const [options] = await db.query('SELECT * FROM Opts WHERE OptionID = ? AND PollID = ?', [OptionID, PollID]);

        if (options.length === 0) {
            return res.status(400).json({
                message: 'Option does not belong to the specified Poll',
            });
        }

        await db.query('DELETE FROM Submition WHERE UserID = ? AND OptionID IN (SELECT OptionID FROM Opts WHERE PollID = ?)', [UserID, PollID]);

        await db.query('INSERT INTO Submition (UserID, OptionID) VALUES (?, ?)', [UserID, OptionID]);

        return res.status(200).json({
            message: 'Vote updated successfully',
        });
    } catch (error) {
        console.log('Update vote failed', error);
        return res.status(500).json({
            message: 'Error',
            error: error.message,
        });
    }
};


const getVote = async (req, res) => {
    const { PollID } = req.params;
    try {
        const [polls] = await db.query(
            `SELECT p.Title, o.OptionID, o.Content, COUNT(s.UserID) as voteCount 
             FROM Polls p 
             LEFT JOIN Opts o ON p.PollID = o.PollID 
             LEFT JOIN Submition s ON o.OptionID = s.OptionID 
             WHERE p.PollID = ? 
             GROUP BY o.OptionID`,
            [PollID]
        );

        if (polls.length === 0) {
            return res.status(404).json({
                message: 'Poll not found',
            });
        }

        return res.status(200).json({
            message: 'Votes retrieved successfully',
            poll: polls[0].Title, 
            options: polls.map(option => ({
                OptionID: option.OptionID,
                Content: option.Content,
                voteCount: option.voteCount
            }))
        });
    } catch (error) {
        console.log('Get votes failed', error);
        return res.status(500).json({
            message: 'Error',
            error: error.message,
        });
    }
};

module.exports = {
    createOption,
    deleteOption,
    updateVote,
    getVote
};
