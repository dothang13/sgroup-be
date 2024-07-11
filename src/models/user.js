const { db } = require('../configs/dbPolls');

const User = {
    checkUserExists: async (userID) => {
        try {
            const [rows] = await db.query('SELECT * FROM Users WHERE UserID = ?', [userID]);
            return rows.length > 0;
        } catch (error) {
            console.error('Error checking user existence:', error);
            throw error;
        }
    }
};

module.exports = User;
