const database = require('./db');

async function findOne(email) {
    const sql = `SELECT * FROM LOGIN WHERE EMAIL = :email`;
    const binds = {
        email : email
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function findOneByID(id) {
    const sql = `SELECT * FROM DOCTORS WHERE ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

module.exports = {
    findOne,
    findOneByID
}