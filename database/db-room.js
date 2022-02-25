const database = require('./db');

async function getAllRooms() {
    const sql = `SELECT R.ROOM_ID as ROOM_ID, D.NAME as DEPT_NAME, W.WARD_NO as WARD_NO, D.ID as DEPT_ID, R.BEDS as BEDS
    FROM ROOMS R JOIN WARDS W on (R.WARD_NO = W.WARD_NO)
    JOIN DEPARTMENTS D on (W.DEPARTMENT_ID = D.ID)`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getRoomById(ROOM_ID) {
    const sql = `SELECT R.ROOM_ID as ROOM_ID, D.NAME as DEPT_NAME, W.WARD_NO as WARD_NO, D.ID as DEPT_ID, R.BEDS as BEDS
    FROM ROOMS R JOIN WARDS W on (R.WARD_NO = W.WARD_NO)
    JOIN DEPARTMENTS D on (W.DEPARTMENT_ID = D.ID)
    WHERE R.ROOM_ID = :ROOM_ID`;
    const binds = {
        ROOM_ID: ROOM_ID
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function addRoom(room) {
    const sql = `INSERT INTO ROOMS(ROOM_ID, BEDS, WARD_NO, DEPARTMENT_ID) 
    VALUES(:ROOM_ID, :BEDS, :WARD_NO, :DEPARTMENT_ID)`;
    const binds = {
        ROOM_ID: room.ROOM_ID,
        BEDS: room.BEDS, 
        WARD_NO: room.WARD_NO,
        DEPARTMENT_ID: room.DEPARTMENT_ID
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function editRoom(room) {
    const sql = `UPDATE ROOMS
    SET BEDS = :BEDS WHERE ROOM_ID = :ROOM_ID AND DEPARTMENT_ID = :DEPARTMENT_ID`;
    const binds = {
        BEDS: room.BEDS,
        ROOM_ID: room.ROOM_ID,
        DEPARTMENT_ID: room.DEPARTMENT_ID
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function deleteRoom(ROOM_ID) {
    const sql = `DELETE FROM ROOMS WHERE ROOM_ID = :ROOM_ID`;
    const binds = {
        ROOM_ID: ROOM_ID
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

module.exports = {
    getAllRooms,
    getRoomById,
    addRoom,
    editRoom,
    deleteRoom
}