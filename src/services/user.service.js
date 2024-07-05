const conn = require("../configs/database");

const getAllUsers = async () => {
    const result = await conn.query("SELECT * FROM users");
    console.log(result)
    return result[0];
}


getAllUsers()

module.exports = {
    getAllUsers
}
