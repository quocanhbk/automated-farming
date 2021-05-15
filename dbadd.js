const mysql = require('mysql')

let conn = mysql.createConnection({
    host: 'mysql-30814-0.cloudclusters.net',
    port: 30848,
    database: 'farm',
    user: 'staff',
    password: 'password'
})

conn.connect((err) => {
    if (!err){
         console.log("Success")
         var sql = "CREATE TABLE mainsystem(id varchar(9) NOT NULL,sstatus boolean,smode boolean,PRIMARY KEY(id))";
         conn.query(sql, (err, result) => {
             if (!err) console.log("Success")
             else console.log("Failed")
         })
    }
    else console.log("Not connected")
})

