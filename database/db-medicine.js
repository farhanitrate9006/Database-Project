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

module.exports = {
    getAllMedicines,
    getMedicineById
}