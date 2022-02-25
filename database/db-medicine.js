const database = require('./db');

async function getAllMedicines() {
    const sql = `SELECT * FROM MEDICINE ORDER BY NAME`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getMedicineById(id) {
    const sql = `SELECT * FROM MEDICINE WHERE ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function editMedicine(medicine){
    const sql = `UPDATE MEDICINE
    SET NAME = :NAME, PRICE = :PRICE WHERE ID = :ID`;
    const binds = {
        NAME: medicine.NAME,
        ID: medicine.ID,
        PRICE: medicine.PRICE
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function addMedicine(test){
    const sql = `INSERT INTO MEDICINE (ID, NAME, PRICE) VALUES (:ID, :NAME, :PRICE)`;
    const binds = {
        NAME: test.NAME,
        ID: test.ID,
        PRICE: test.PRICE
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function deleteMedicine(id){
    const sql = `DELETE FROM MEDICINE WHERE ID = :ID`;
    const binds = {
        ID: id
    };
    await database.execute(sql, binds, database.options);
}

module.exports = {
    getAllMedicines,
    getMedicineById,
    editMedicine,
    addMedicine,
    deleteMedicine
}