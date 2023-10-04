const db = require('./sqlConn.js');

const connect = async ({login, pass}) => {
    return db.query(`
    select * from "users.utilisateurs"
    where "login"='${login}'
    and "pass"='${pass}'`);
}

module.exports = connect;