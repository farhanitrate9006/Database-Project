const database = require('./db');

async function getAllBeds() {
    const sql = `SELECT B.BED_NO as BED_NO, R.ROOM_ID as ROOM_ID, D.NAME as DEPT_NAME, W.WARD_NO as WARD_NO, D.ID as DEPT_ID
    FROM BEDS B JOIN ROOMS R on (B.ROOM_ID = R.ROOM_ID)
    JOIN WARDS W on (R.WARD_NO = W.WARD_NO)
    JOIN DEPARTMENTS D on (W.DEPARTMENT_id = D.ID)`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getBedById(r_id, b_no) {
    const sql = `SELECT B.BED_NO as BED_NO, R.ROOM_ID as ROOM_ID, D.NAME as DEPT_NAME, W.WARD_NO as WARD_NO, D.ID as DEPT_ID
    FROM BEDS B JOIN ROOMS R on (B.ROOM_ID = R.ROOM_ID)
    JOIN WARDS W on (R.WARD_NO = W.WARD_NO)
    JOIN DEPARTMENTS D on (W.DEPARTMENT_id = D.ID) 
    WHERE R.ROOM_ID = :r_id AND B.BED_NO = :b_no`;
    const binds = {
        r_id: r_id,
        b_no: b_no
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function addBed(bed) {
    const sql = `INSERT INTO BEDS(BED_NO, ROOM_ID) VALUES(:BED_NO, :ROOM_ID)`;
    const binds = {
        BED_NO: bed.BED_NO,
        ROOM_ID: bed.ROOM_ID
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function editBed(bed) {
    const sql = `UPDATE BEDS
    SET BED_NO = :BED_NO WHERE BED_NO = :OLD.BED_NO AND ROOM_ID = :ROOM_ID`;
    const binds = {
        BED_NO: bed.BED_NO,
        ROOM_ID: bed.ROOM_ID
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function deleteBed(r_id, b_no) {
    const sql = `DELETE FROM BEDS WHERE ROOM_ID = :r_id AND BED_NO = :b_no`;
    const binds = {
        r_id: r_id,
        w_no: b_no
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

module.exports = {
    getAllBeds,
    getBedById,
    addBed,
    editBed,
    deleteBed
}