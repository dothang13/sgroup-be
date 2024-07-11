const { db } = require('../configs/dbPolls');

const Opts = {
    createOption: async (data) => {
        try {
            const [result] = await db.query(
                'INSERT INTO Opts (Content, PollID, UserID) VALUES (?, ?, ?)',
                [data.Content, data.PollID, data.UserID]
            );
            return result;
        } catch (error) {
            console.error('Error creating option:', error);
            throw error;
        }
    },

    deleteOption: async (optionID) => {
        try {
            const [result] = await db.query('DELETE FROM Opts WHERE OptionID = ?', [optionID]);
            return result;
        } catch (error) {
            console.error('Error deleting option:', error);
            throw error;
        }
    }
};

module.exports = Opts;
