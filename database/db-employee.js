const database = require('./db');

async function getAllEmployees() {
    const sql = `SELECT * FROM EMPLOYEES ORDER BY NAME`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getNurses(){
    const sql = `SELECT N.ID as ID, E.NAME as NURSE_NAME, N.WORK_HOUR as WORK_HOUR
    FROM NURSES N JOIN EMPLOYEES E on (N.ID = E.ID)`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getStaffs(){
    const sql = `SELECT S.ID as ID, E.NAME as STAFF_NAME, S.WORK_HOUR as WORK_HOUR
    FROM FOURTH_GRADE_STAFFS S JOIN EMPLOYEES E on (S.ID = E.ID)`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getReceptionists(){
    const sql = `SELECT R.ID as ID, E.NAME as RECEPTIONIST_NAME, R.DESK_NUMBER as DESK_NUMBER
    FROM RECEPTIONISTS R JOIN EMPLOYEES E on (R.ID = E.ID)`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getEmployeeById(id) {
    const sql = `SELECT * FROM EMPLOYEES WHERE ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    getNurses,
    getStaffs,
    getReceptionists
}