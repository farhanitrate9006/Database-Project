const database = require('./db');

async function getAllDepartments() {
    const sql = `SELECT * FROM DEPARTMENTS ORDER BY NAME`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getDepartmentById(id) {
    const sql = `SELECT * FROM DEPARTMENTS WHERE ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

module.exports = {
    getAllDepartments,
    getDepartmentById
}