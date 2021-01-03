/*
    name: SQL CONNECTOR
    path: db/mysql/connection.js
    Objective: In this file we made the connection of mySQL database with our server.
*/

const mysql = require('mysql')
require('dotenv').config()

var db  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.MYSQL_HOST,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
  });
db.Promise = global.Promise;
global.db = db

module.exports = db
