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
        columns: ['ID', 'DOCTOR_NAME', 'DEPT_NAME']
    });   
});

// get a specific employee by his id
// router.get('/:id', async(req, res) => {
//     let employee = await db_employees.getEmployeeById(req.params.id);
//     res.render('table', {
//         depts: deptObj,
//         tests: testObj,
//         medicines: medicineObj,
//         tableTitle: 'Employee',
//         list: employee,
//         columns: ['ID', 'NAME', 'JOB_TYPE', 'SALARY']
//     });  
// });

module.exports = router;