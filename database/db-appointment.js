const database = require('./db');

async function getAllAppointments() {
    const sql = `SELECT * FROM APPOINTMENTS`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getAppointmentById(id) {
    const sql = `SELECT * FROM APPOINTMENTS WHERE ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function addDept(appointment) {
    const sql = `INSERT INTO APPOINTMENTS(ID, NAME) VALUES(:ID, :NAME)`;
    const binds = {
        ID: appointment.ID,
        NAME: appointment.NAME
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function editDept(appointment) {
    const sql = `UPDATE APPOINTMENTS
    SET ID = :ID WHERE ID = :OLD.ID AND NAME = :NAME`;
    const binds = {
        ID: appointment.ID,
        NAME: appointment.NAME
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function deleteAppointment(id) {
    const sql = `DELETE FROM APPOINTMENTS WHERE ID = :id`;
    const binds = {
        id: id
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

module.exports = {
    getAllAppointments,
    getAppointmentById,
    addDept,
    editDept,
    deleteAppointment
}