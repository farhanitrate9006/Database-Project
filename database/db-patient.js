const database = require('./db');

async function getAllPatients() {
    const sql = `SELECT * FROM PATIENTS`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getPatientById(id) {
    const sql = `SELECT * FROM PATIENTS WHERE ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function addPatient(patient) {
    const sql = `INSERT INTO PATIENTS(ID, NAME) VALUES(:ID, :NAME)`;
    const binds = {
        ID: patient.ID,
        NAME: patient.NAME
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function editPatient(patient) {
    const sql = `UPDATE PATIENTS
    SET ID = :ID WHERE ID = :OLD.ID AND NAME = :NAME`;
    const binds = {
        ID: patient.ID,
        NAME: patient.NAME
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function deletePatient(id) {
    const sql = `DELETE FROM PATIENTS WHERE ID = :id`;
    const binds = {
        id: id
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

module.exports = {
    getAllPatients,
    getPatientById,
    addPatient,
    editPatient,
    deletePatient
}