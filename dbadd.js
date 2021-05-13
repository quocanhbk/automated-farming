const mysql = require('mysql')

let conn = mysql.createConnection({
    host: 'mysql-30814-0.cloudclusters.net',
    port: 30848,
    database: 'farm',
    user: 'staff',
    password: 'password'
})

conn.connect((err) => {
    if (!err) console.log("Success")
})