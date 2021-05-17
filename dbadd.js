const { connect } = require('mqtt');
var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "mysql-30814-0.cloudclusters.net",
  port: 30848,
  user: "staff",
  password: "password",
  database: "farm"
});

<<<<<<< HEAD
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

=======
module.exports = conn

conn.connect(function(err) {
  if (!err){
  console.log("Connected!");
  }
  else{
    console.log("No Connect")
    console.log(err)
  }
});
conn.end()
>>>>>>> e24ddee9d25d4d552ad1921959135dc6c844149d
