// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_patients = require('../database/db-patient');

const router = express.Router({ mergeParams : true });

router.get('/', async(req, res) => {
    // returns a list with 1 employee
    let patients = await db_patients.getAllPatients();
    //console.log(patients);

    res.render('admin-wards', {
        tableTitle: 'Patients', 
        columns: ['ID', 'NAME'],
        list: patients,
        type: 'patient'
    });  
});

// get a specific employee by his id
router.get('/id/:id', async(req, res) => {
    // returns a list with 1 employee
    let patients = await db_patients.getPatientById(req.params.id);

    res.render('admin-ward-info', {
        tableTitle: 'Patient', 
        columns: ['ID', 'NAME', 'AGE', 'BLOOD_GROUP'],
        list: patients[0],
        type: 'patient'
    });  
});

// get a specific employee by his id
router.get('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    let patients = await db_patients.getDepartmentById(req.params.id);

    res.render('admin-patient-form', {
        formTitle: 'Edit Department', 
        list: patients[0],
        postLink: '/admin/patient/id/:id/edit'
    });  
});

router.post('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    console.log('he');
    const patient = req.body;
    console.log(patient);

    db_patients.editRoom(patient);
    res.redirect('/admin/patient');
});

router.get('/add', async(req, res) => {
    res.render('admin-patient-form', {
        formTitle: 'Add New Department',
        postLink: '/admin/patient/add'
    });  
});

router.post('/add', async(req, res) => {
    // returns a list with 1 employee
    //console.log('she');
    //console.log(req.body);
    const patient = req.body;

    db_patients.addDept(patient);
    res.redirect('/admin/patient');
});

router.get('/id/:id/delete', async(req, res) => {
    //console.log(req.params.d_id, req.params.w_id);
    db_patients.deletePatient(req.params.id);
    res.redirect('/admin/patient');
});

module.exports = router;