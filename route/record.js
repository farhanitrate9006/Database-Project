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


module.exports = router;