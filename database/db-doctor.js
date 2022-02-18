const database = require('./db');

async function getAllDoctors() {
    const sql = `SELECT D.ID as ID, E.NAME as DOCTOR_NAME, P.NAME as DEPT_NAME
    FROM DOCTORS D JOIN DEPARTMENTS P on (D.DEPARTMENT_ID = P.ID)
    JOIN EMPLOYEES E on (D.ID = E.ID)`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getDoctorsByDept(dept) {
    const sql = `SELECT D.ID as ID, E.NAME as DOCTOR_NAME, P.NAME as DEPT_NAME
    FROM DOCTORS D JOIN DEPARTMENTS P on (D.DEPARTMENT_ID = P.ID)
    JOIN EMPLOYEES E on (D.ID = E.ID) where D.DEPARTMENT_ID = :dept`;
    //where D.DEPARTMENT_ID = :dept
    const binds = { dept: dept };
    return (await database.execute(sql, binds, database.options)).rows;
    //return (await database.execute(sql, {}, database.options)).rows;
}

async function getDoctorById(id) {
    const sql = `SELECT D.ID as ID, E.NAME as DOCTOR_NAME, P.NAME as DEPT_NAME
    FROM DOCTORS D JOIN DEPARTMENTS P on (D.DEPARTMENT_ID = P.ID)
    JOIN EMPLOYEES E on (D.ID = E.ID) where D.ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

module.exports = {
    getAllDoctors,
    getDoctorsByDept,
    getDoctorById
}