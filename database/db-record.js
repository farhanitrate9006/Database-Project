const database = require('./db');

async function getAllRecords() {
    const sql = `SELECT * FROM RECORD`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getRecordById(id) {
    const sql = `SELECT * FROM RECORD WHERE ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function addRecord(record) {
    const sql = `INSERT INTO RECORD(ID, NAME) VALUES(:ID, :NAME)`;
    const binds = {
        ID: record.ID,
        NAME: record.NAME
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function editRecord(record) {
    const sql = `UPDATE RECORD
    SET ID = :ID WHERE ID = :OLD.ID AND NAME = :NAME`;
    const binds = {
        ID: record.ID,
        NAME: record.NAME
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function deleteRecord(id) {
    const sql = `DELETE FROM RECORD WHERE ID = :id`;
    const binds = {
        id: id
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

module.exports = {
    getAllRecords,
    getRecordById,
    addRecord,
    editRecord,
    deleteRecord
}