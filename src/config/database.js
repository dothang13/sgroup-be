const mysql = require("mysql2");
//YC: Tao duoc doi tuong con.
//YC: Ket noi duoc voi database

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123@Thang",
    database: "SGr"
}).promise();


conn.connect()
    .then(()=>{
        console.log("Connected to MYSQL server");
    })
    .catch((err)=>{
        console.log(err);
    });
module.exports =conn;
//query -> truy van



// conn.query("SELECT * FROM users", (err, result)=>{
//     if(err) throw err;
//     console.log(result);
// })



// const newUser = {name: "Linh Ng", username: "melicom1", password : "12345678"};

// conn.query(`INSERT INTO users(name,username,password) VALUES("${newUser.name}","${newUser.username}","${newUser.password}")  ` , (err) => {
// 	if (err) throw err;
// 	console.log("Ok3!");
// })


// module.exports =conn;
// const excute =>  async() => {

// }
// excute();







