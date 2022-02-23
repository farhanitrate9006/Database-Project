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

async function fixAppointmentById(appointment) {
    const sql = `
        BEGIN
            ADD_DOCTOR(:ID, :NAME, :PHONE_NUMBER, :SALARY, :DEPARTMENT_ID, :EMAIL, :PASSWORD);
        END;
    `;
    const binds = {
        ID: appointment.id,
        NAME: appointment.name, 
        PHONE_NUMBER: appointment.phone_number, 
        SALARY: appointment.salary, 
        DEPARTMENT_ID: appointment.dept, 
        EMAIL: appointment.email,
        PASSWORD: appointment.password
    };

    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function addAppointment(appointment) {
    const sql = `INSERT INTO APPOINTMENTS(ID, NAME) VALUES(:ID, :NAME)`;
    const binds = {
        ID: appointment.ID,
        NAME: appointment.NAME
    };
    //console.log(binds);
    await database.execute(sql, binds, database.options);
}

async function editAppointment(appointment) {
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
    addAppointment,
    editAppointment,
    deleteAppointment
}