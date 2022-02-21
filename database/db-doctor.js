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
    const sql = `SELECT D.ID as ID, E.NAME as DOCTOR_NAME, E.PHONE_NUMBER as PHONE_NUMBER,
    E.SALARY as SALARY, P.ID as DEPARTMENT_ID, D.EMAIL as EMAIL, L.PASSWORD as PASSWORD, P.NAME as DEPT_NAME
    FROM DOCTORS D JOIN DEPARTMENTS P on (D.DEPARTMENT_ID = P.ID)
    JOIN EMPLOYEES E on (D.ID = E.ID) where D.ID = :id
    JOIN LOGIN L on (D.ID = L.ID) where D.ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getDoctorByEmail(email) {
    const sql = `SELECT D.ID as ID, E.NAME as DOCTOR_NAME, E.PHONE_NUMBER as PHONE_NUMBER,
    E.SALARY as SALARY, P.ID as DEPARTMENT_ID, D.EMAIL as EMAIL, L.PASSWORD as PASSWORD, P.NAME as DEPT_NAME
    FROM DOCTORS D JOIN DEPARTMENTS P on (D.DEPARTMENT_ID = P.ID)
    JOIN EMPLOYEES E on (D.ID = E.ID) where D.EMAIL = :email
    JOIN LOGIN L on (D.ID = L.ID) where D.EMAIL = :email`;
    const binds = {
        email : email
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function addDoctor(doctor) {
    const sql = `
        BEGIN
            ADD_DOCTOR(:ID, :NAME, :PHONE_NUMBER, :SALARY, :DEPARTMENT_ID, :EMAIL, :PASSWORD)
        END;
    `;
    const binds = {
        ID: doctor.id,
        NAME: doctor.name, 
        PHONE_NUMBER: doctor.phone_number, 
        SALARY: doctor.salary, 
        DEPARTMENT_ID: doctor.department_id, 
        EMAIL: doctor.email,
        PASSWORD: doctor.password,
    };

    console.log(binds);
    await database.execute(sql, binds, database.options);
}

module.exports = {
    getAllDoctors,
    getDoctorsByDept,
    getDoctorById,
    getDoctorByEmail,
    addDoctor
}