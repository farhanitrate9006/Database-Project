// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_doctors = require('../database/db-doctor');

const router = express.Router({ mergeParams : true });

// get all employees
router.get('/', async(req, res) => {
    let doctorsObj = await db_doctors.getAllDoctors();

    res.render('admin-manage', {
        tableTitle: 'All Doctors',
        list: doctorsObj,
        //idLink: '/admin/employee/doctor/id/',
        columns: ['ID', 'DOCTOR_NAME', 'DEPT_NAME']
    });   
});

// get a specific employee by his id
router.get('/id/:id', async(req, res) => {
    let doctors = await db_doctors.getDoctorById(req.params.id);
    res.render('admin-employee', {
        tableTitle: 'Doctor Info',
        list: doctors[0],
        columns: ['ID', 'DOCTOR_NAME', 'DEPT_NAME']
    });  
});

module.exports = router;