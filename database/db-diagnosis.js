const database = require('./db');

async function getAllDiagnosises() {
    const sql = `SELECT * FROM DIAGNOSIS ORDER BY ID`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getDiagnosisById(id) {
    const sql = `SELECT * FROM DIAGNOSIS WHERE ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function editDiagnosis(diagnosis){
    const sql = `UPDATE DIAGNOSIS
    SET TEST_ID = :TEST_ID, DOCTOR_ID = :DOCTOR_ID, PATIENT_ID = :PATIENT_ID, RESULT = :RESULT WHERE ID = :ID`;
    const binds = {
        TEST_ID: diagnosis.TEST_ID,
        ID: diagnosis.ID,
        DOCTOR_ID: diagnosis.DOCTOR_ID,
        PATIENT_ID: diagnosis.PATIENT_ID,
        RESULT: diagnosis.RESULT 
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function addDiagnosis(diagnosis){
    const sql = `INSERT INTO DIAGNOSIS (ID, DOCTOR_ID, PATIENT_ID, TEST_ID, RESULT) VALUES (:ID, :DOCTOR_ID, :PATIENT_ID, :TEST_ID, :RESULT)`;
    const binds = {
        DOCTOR_ID: diagnosis.DOCTOR_ID,
        ID: diagnosis.ID,
        PATIENT_ID: diagnosis.PATIENT_ID,
        TEST_ID: diagnosis.TEST_ID,
        RESULT: diagnosis.RESULT
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function deleteDiagnosis(id){
    const sql = `DELETE FROM DIAGNOSIS WHERE ID = :ID`;
    const binds = {
        ID: id
    };
    await database.execute(sql, binds, database.options);
}

module.exports = {
    getAllDiagnosises,
    getDiagnosisById,
    editDiagnosis,
    addDiagnosis,
    deleteDiagnosis
}