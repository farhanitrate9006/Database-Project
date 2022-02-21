// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_departments = require('../database/db-dept');
const db_doctors = require('../database/db-doctor');

const router = express.Router({ mergeParams : true });

// get all employees
router.get('/', async(req, res) => {
    let doctorsObj = await db_doctors.getAllDoctors();

    res.render('admin-employees', {
        tableTitle: 'All Doctors',
        list: doctorsObj,
        addLink: '/admin/employee/doctor/add/',
        columns: ['ID', 'DOCTOR_NAME', 'DEPT_NAME']
    });   
});

// get a specific employee by his id
router.get('/id/:id', async(req, res) => {
    let doctors = await db_doctors.getDoctorById(req.params.id);
    res.render('admin-employee-info', {
        tableTitle: 'Doctor Info',
        list: doctors[0],
        columns: ['ID', 'DOCTOR_NAME', 'DEPT_NAME', 'EMAIL', 'PHONE_NUMBER', 'SALARY']
    });  
});

router.get('/id/:id/edit', async(req, res) => {
    let doctors = await db_doctors.getDoctorById(req.params.id);
    let depts = await db_departments.getAllDepartments();
    res.render('admin-employee-form', {
        formTitle: 'Edit Doctor Info',
        list: doctors[0],
        postLink: '/admin/employee/doctor/edit/',
        depts: depts
        //columns: ['ID', 'DOCTOR_NAME', 'DEPT_NAME']
    });  
});

router.post('/edit', async(req, res) => {
    console.log('he');
    console.log(req.body.email);
});

router.get('/add', async(req, res) => {
    //let doctors = await db_doctors.getDoctorById(req.params.id);
    let depts = await db_departments.getAllDepartments();
    res.render('admin-employee-form', {
        formTitle: 'Add New Doctor',
        postLink: '/admin/employee/doctor/add/',
        depts: depts
    });  
});

router.post('/add', async(req, res) => {
    console.log('she');
    console.log(req.body);
    const doctor = req.body;

    db_doctors.addDoctor(doctor);
    res.redirect('/admin/employee/doctor/');
});

module.exports = router;