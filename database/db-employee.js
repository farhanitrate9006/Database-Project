const database = require('./db');

async function getAllEmployees() {
    const sql = `SELECT * FROM EMPLOYEES ORDER BY NAME`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getEmployeeById(id) {
    const sql = `SELECT * FROM EMPLOYEES WHERE ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows[0];
}

module.exports = {
    getAllEmployees,
    getEmployeeById
}