const mssql = require("mssql");
require('dotenv').config()

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};

const db = mssql.connect(config, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connected');
    }
});

module.exports = db;