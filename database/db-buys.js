const database = require('./db');

async function getAllBuys() {
    const sql = `SELECT * FROM BUYS`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getBuyById(p_id, m_id) {
    const sql = `SELECT * FROM BUYS WHERE PATIENT_ID = :p_id AND MEDICINE_ID = :m_id`;
    const binds = {
        p_id : p_id,
        m_id: m_id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function editBuys(buys){
    const sql = `UPDATE BUYS
    SET AMOUNT = :AMOUNT WHERE PATIENT_ID = :PATIENT_ID AND MEDICINE_ID = :MEDICINE_ID`;
    const binds = {
        AMOUNT: buys.AMOUNT,
        PATIENT_ID: buys.PATIENT_ID,
        MEDICINE_ID: buys.MEDICINE_ID
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function addBuy(buys){
    const sql = `INSERT INTO BUYS (PATIENT_ID, MEDICINE_ID, AMOUNT) VALUES (:PATIENT_ID, :MEDICINE_ID, :AMOUNT)`;
    const binds = {
        PATIENT_ID: buys.PATIENT_ID,
        MEDICINE_ID: buys.MEDICINE_ID,
        AMOUNT: buys.AMOUNT
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function deleteBuy(p_id, m_id){
    const sql = `DELETE FROM BUYS WHERE PATIENT_ID = :PATIENT_ID AND MEDICINE_ID = :MEDICINE_ID`;
    const binds = {
        PATIENT_ID: p_id,
        MEDICINE_ID: m_id 
    };
    await database.execute(sql, binds, database.options);
}

module.exports = {
    getAllBuys,
    getBuyById,
    editBuys,
    addBuy,
    deleteBuy
}