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

async function editTest(test){
    const sql = `UPDATE TESTS
    SET NAME = :NAME, FEE = :FEE, ROOM_ID = :ROOM_ID WHERE ID = :ID`;
    const binds = {
        NAME: test.NAME,
        ID: test.ID,
        FEE: test.FEE,
        ROOM_ID: test.ROOM_ID
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function addTest(test){
    const sql = `INSERT INTO TESTS (ID, NAME, FEE, ROOM_ID) VALUES (:ID, :NAME, :FEE, :ROOM_ID)`;
    const binds = {
        NAME: test.NAME,
        ID: test.ID,
        FEE: test.FEE,
        ROOM_ID: test.ROOM_ID
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function deleteTest(id){
    const sql = `DELETE FROM TESTS WHERE ID = :ID`;
    const binds = {
        ID: id
    };
    await database.execute(sql, binds, database.options);
}

module.exports = {
    getAllTests,
    getTestById,
    editTest,
    addTest,
    deleteTest
}