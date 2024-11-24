const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: 'rootpass',
    database: 'myapp'
});

exports.pool = pool;