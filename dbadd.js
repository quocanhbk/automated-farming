const { connect } = require('mqtt');
var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "mysql-30814-0.cloudclusters.net",
  port: 30848,
  user: "staff",
  password: "password",
  database: "farm"
});

conn.connect(function(err) {
  if (!err){
  console.log("Connected!");
  }
  else{
    console.log("No Connect")
    console.log(err)
  }
});

module.exports = conn
