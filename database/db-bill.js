const database = require('./db');

async function getAllBills() {
    const sql = `SELECT * FROM BILL ORDER BY ID`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getBillById(id) {
    const sql = `SELECT * FROM BILL WHERE ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function addBill(bill){
    const sql = `INSERT INTO BILL (ID, ROOM_CHARGE, MEDICINE_CHARGE, TREATMENT_CHARGE) VALUES (:ID, :ROOM_CHARGE, :MEDICINE_CHARGE, :TREATMENT_CHARGE)`;
    const binds = {
        ID: bill.ID,
        MEDICINE_CHARGE: bill.MEDICINE_CHARGE,
        ROOM_CHARGE: bill.ROOM_CHARGE,
        TREATMENT_CHARGE: bill.TREATMENT_CHARGE
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function editBill(bill){
    const sql = `UPDATE BILL
    SET ROOM_CHARGE = :ROOM_CHARGE, MEDICINE_CHARGE = :MEDICINE_CHARGE, TREATMENT_CHARGE = :TREATMENT_CHARGE WHERE ID = :ID`;
    const binds = {
        MEDICINE_CHARGE: bill.MEDICINE_CHARGE,
        ID: bill.ID,
        TREATMENT_CHARGE: bill.TREATMENT_CHARGE,
        ROOM_CHARGE: bill.ROOM_CHARGE
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function deleteBill(id){
    const sql = `DELETE FROM BILL WHERE ID = :ID`;
    const binds = {
        ID: id
    };
    await database.execute(sql, binds, database.options);
}

module.exports = {
    getAllBills,
    getBillById,
    addBill,
    editBill,
    deleteBill
}