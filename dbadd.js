const { connect } = require('mqtt');
var mysql = require('mysql');
module.exports = conn

var conn = mysql.createConnection({
  host: "mysql-30814-0.cloudclusters.net",
  port: 30848,
  user: "staff",
  password: "password",
  database: "farm"
});

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



conn.connect(function(err) {
  if (!err){
  console.log("Connected!");
  }
  else{
    console.log("No Connect")
    console.log(err)
  }
})

