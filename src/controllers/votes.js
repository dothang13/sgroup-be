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
        const { UserID, OptionID } = req.body;

        await db.query('DELETE FROM Submition WHERE UserID = ?', [UserID]);

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
        const [votes] = await db.query(
            'SELECT OptionID, COUNT(UserID) as voteCount FROM Submition WHERE OptionID IN (SELECT OptionID FROM Opts WHERE PollID = ?) GROUP BY OptionID',
            [PollID]
        );
        
        return res.status(200).json({
            message: 'Votes retrieved successfully',
            votes: votes
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
