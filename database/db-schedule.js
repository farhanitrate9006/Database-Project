const database = require('./db');

async function getAllSchedules() {
    const sql = `SELECT * FROM SCHEDULES ORDER BY START_DATE`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getScheduleById(id) {
    const sql = `SELECT * FROM SCHEDULES WHERE ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getScheduleByDept(id) {
    const sql = `SELECT S.ID as ID, D.ID as DOC_ID, E.NAME as DOCTOR_NAME, P.NAME as DEPT_NAME, S.SLOTS as SLOTS,
    S.START_DATE as APPOINT_DATE, S.START_TIME as START_TIME, S.END_TIME as END_TIME
    FROM SCHEDULES S JOIN DOCTORS D on (S.DOC_ID = D.ID)
    JOIN EMPLOYEES E on (D.ID = E.ID)
    JOIN DEPARTMENTS P on (D.DEPARTMENT_ID = P.ID)
    WHERE P.ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getScheduleByDoc(id) {
    const sql = `SELECT S.ID as ID, D.ID as DOC_ID, E.NAME as DOCTOR_NAME, P.NAME as DEPT_NAME, S.SLOTS as SLOTS,
    S.START_DATE as APPOINT_DATE, S.START_TIME as START_TIME, S.END_TIME as END_TIME
    FROM SCHEDULES S JOIN DOCTORS D on (S.DOC_ID = D.ID)
    JOIN EMPLOYEES E on (D.ID = E.ID)
    JOIN DEPARTMENTS P on (D.DEPARTMENT_ID = P.ID)
    WHERE D.ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function addSchedule(schedule) {
    const sql = `INSERT INTO SCHEDULES(ID, DOC_ID, START_DATE, END_DATE, START_TIME, END_TIME, SLOTS)
    VALUES(:id, :doc_id, TO_DATE(:start_date,'YYYY-MM-DD'), TO_DATE(:end_date,'YYYY-MM-DD'), 
    :start_time, :end_time, :slots)`;
    
    const binds = {
        id: schedule.id,
        doc_id: schedule.doc_id,
        start_date: schedule.start_date,
        end_date: schedule.end_date,
        start_time: schedule.start_time,
        end_time: schedule.end_time,
        slots: schedule.slots
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function editSchedule(schedule) {
    const sql = `UPDATE SCHEDULES
    SET ID = :ID WHERE ID = :OLD.ID AND NAME = :NAME`;
    const binds = {
        ID: schedule.ID,
        NAME: schedule.NAME
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function deleteSchedule(id) {
    const sql = `DELETE FROM SCHEDULES WHERE ID = :id`;
    const binds = {
        id: id
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

module.exports = {
    getAllSchedules,
    getScheduleById,
    getScheduleByDept,
    getScheduleByDoc,
    addSchedule,
    editSchedule,
    deleteSchedule
}