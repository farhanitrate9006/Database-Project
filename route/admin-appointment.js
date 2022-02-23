// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_appointments = require('../database/db-appointment');

const router = express.Router({ mergeParams : true });

router.get('/', async(req, res) => {
    // returns a list with 1 employee
    let appointments = await db_appointments.getAllAppointments();
    //console.log(appointments);

    res.render('admin-wards', {
        tableTitle: 'Appointments', 
        columns: ['ID', 'DOCTOR_ID'],
        list: appointments,
        type: 'appointment'
    });  
});

// get a specific employee by his id
router.get('/id/:id', async(req, res) => {
    // returns a list with 1 employee
    let appointments = await db_appointments.getAppointmentById(req.params.id);

    res.render('admin-ward-info', {
        tableTitle: 'Appointment', 
        columns: ['ID', 'DOCTOR_ID'],
        list: appointments[0],
        type: 'appointment'
    });  
});

// get a specific employee by his id
router.get('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    let appointments = await db_appointments.getDepartmentById(req.params.id);

    res.render('admin-appointment-form', {
        formTitle: 'Edit Department', 
        list: appointments[0],
        postLink: '/admin/appointment/id/:id/edit'
    });  
});

router.post('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    console.log('he');
    const appointment = req.body;
    console.log(appointment);

    db_appointments.editRoom(appointment);
    res.redirect('/admin/appointment');
});

router.get('/add', async(req, res) => {
    res.render('admin-appointment-form', {
        formTitle: 'Add New Department',
        postLink: '/admin/appointment/add'
    });  
});

router.post('/add', async(req, res) => {
    // returns a list with 1 employee
    //console.log('she');
    //console.log(req.body);
    const appointment = req.body;

    db_appointments.addDept(appointment);
    res.redirect('/admin/appointment');
});

router.get('/id/:id/delete', async(req, res) => {
    //console.log(req.params.d_id, req.params.w_id);
    db_appointments.deleteAppointment(req.params.id);
    res.redirect('/admin/appointment');
});

module.exports = router;