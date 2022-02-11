const database = require('./db');

async function getAllTests() {
    const sql = `SELECT * FROM TESTS ORDER BY NAME`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getTestById(id) {
    const sql = `SELECT * FROM TESTS WHERE ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

module.exports = {
    getAllTests,
    getTestById
}