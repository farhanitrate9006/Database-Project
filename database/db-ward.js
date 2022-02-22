const database = require('./db');

async function getAllWards() {
    const sql = `SELECT W.WARD_NO as WARD_NO, D.NAME as DEPT_NAME, D.ID as DEPT_ID
    FROM WARDS W JOIN DEPARTMENTS D on (W.DEPARTMENT_ID = D.ID)`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getWardById(d_id, w_no) {
    const sql = `SELECT W.WARD_NO as WARD_NO, D.NAME as DEPT_NAME, D.ID as DEPT_ID
    FROM WARDS W JOIN DEPARTMENTS D on (W.DEPARTMENT_ID = D.ID) 
    WHERE D.ID = :d_id AND W.WARD_NO = :w_no`;
    const binds = {
        d_id: d_id,
        w_no: w_no
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function addWard(ward) {
    const sql = `INSERT INTO WARDS(WARD_NO, DEPARTMENT_ID) VALUES(:WARD_NO, :DEPARTMENT_ID)`;
    const binds = {
        WARD_NO: ward.WARD_NO,
        DEPARTMENT_ID: ward.DEPARTMENT_ID
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function editWard(ward) {
    const sql = `UPDATE WARDS
    SET WARD_NO = :WARD_NO WHERE WARD_NO = :OLD.WARD_NO AND DEPARTMENT_ID = :DEPARTMENT_ID`;
    const binds = {
        WARD_NO: ward.WARD_NO,
        DEPARTMENT_ID: ward.DEPARTMENT_ID
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function deleteWard(d_id, w_no) {
    const sql = `DELETE FROM WARDS WHERE DEPARTMENT_ID = :d_id AND WARD_NO = :w_no`;
    const binds = {
        d_id: d_id,
        w_no: w_no
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

module.exports = {
    getAllWards,
    getWardById,
    addWard,
    editWard,
    deleteWard
}