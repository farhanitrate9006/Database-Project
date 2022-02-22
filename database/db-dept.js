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

async function addDept(dept) {
    const sql = `INSERT INTO DEPARTMENTS(ID, NAME) VALUES(:ID, :NAME)`;
    const binds = {
        ID: dept.ID,
        NAME: dept.NAME
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function editDept(dept) {
    const sql = `UPDATE DEPARTMENTS
    SET ID = :ID WHERE ID = :OLD.ID AND NAME = :NAME`;
    const binds = {
        ID: dept.ID,
        NAME: dept.NAME
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function deleteDept(id) {
    const sql = `DELETE FROM DEPARTMENTS WHERE ID = :id`;
    const binds = {
        id: id
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

module.exports = {
    getAllDepartments,
    getDepartmentById,
    addDept,
    editDept,
    deleteDept
}