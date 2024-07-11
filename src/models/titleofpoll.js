const { db } = require('../configs/dbPolls');

const TitleofPoll = {
    createPoll: async (data) => {
        try {
            const [result] = await db.query('INSERT INTO Polls (Title, UserID) VALUES (?, ?)', [data.Title, data.UserID]);
            return result;
        } catch (error) {
            console.error('Error creating poll:', error);
            throw error;
        }
    },
    
    updatePoll: async (PollID, UserID, newTitle) => {
        try {
            const [result] = await db.query(
                'UPDATE Polls SET Title = ? WHERE PollID = ? AND UserID = ?',
                [newTitle, PollID, UserID]
            );
            return result;
        } catch (error) {
            console.error('Error updating poll:', error);
            throw error;
        }
    }
};

module.exports = TitleofPoll;


module.exports = TitleofPoll;
