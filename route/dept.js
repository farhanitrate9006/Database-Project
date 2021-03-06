// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_departments = require('../database/db-dept');
const db_tests = require('../database/db-test');
const db_medicines = require('../database/db-medicine');

const db_doctors = require('../database/db-doctor');
const db_schedules = require('../database/db-schedule');

const router = express.Router({ mergeParams : true });

// get all employees
// router.get('/all', async (req, res) => {
//     let employeesObj = await db_employees.getAllEmployees();
//     // let employees = [];

//     // for(let i = 0; i<employeesObj.length; i++){
//     //     employees.push(employeesObj[i]);
//     //     //console.log(employeesObj[i]);
//     // }

//     res.render('table', {
//         employees: employeesObj
//     });   
// });

// get a specific employee by his id
router.get('/:id', async(req, res) => {
    // returns a list with 1 employee
    let deptObj = await db_departments.getAllDepartments();
    let testObj = await db_tests.getAllTests();
    let medicineObj = await db_medicines.getAllMedicines();

    let tempDept = await db_departments.getDepartmentById(req.params.id);
    let dept = tempDept[0];

    res.render('dept', {
        depts: deptObj,
        tests: testObj,
        medicines: medicineObj,
        dept: dept
    });  
});

router.get('/:id/doctor', async(req, res) => {
    // returns a list with 1 employee
    let deptObj = await db_departments.getAllDepartments();
    let testObj = await db_tests.getAllTests();
    let medicineObj = await db_medicines.getAllMedicines();

    let doctors = await db_doctors.getDoctorsByDept(req.params.id);
    //let dept = tempDept[0];
    //console.log(req.params.DEPT_NAME)

    res.render('table', {
        depts: deptObj,
        tests: testObj,
        medicines: medicineObj,
        tableTitle: doctors[0].DEPT_NAME + ' Doctors', 
        columns: ['ID', 'DOCTOR_NAME', 'DEPT_NAME'],
        list: doctors
    });  
});

router.get('/:id/appointment', async(req, res) => {
    // returns a list with 1 employee
    let deptObj = await db_departments.getAllDepartments();
    let testObj = await db_tests.getAllTests();
    let medicineObj = await db_medicines.getAllMedicines();

    //let doctors = await db_doctors.getDoctorsByDept(req.params.id);
    let schedules = await db_schedules.getScheduleByDept(req.params.id);
    //let dept = tempDept[0];
    //console.log(req.params.DEPT_NAME)

    res.render('table', {
        depts: deptObj,
        tests: testObj,
        medicines: medicineObj,
        tableTitle: schedules[0].DEPT_NAME + ' Doctors', 
        columns: ['DOCTOR_NAME', 'APPOINT_DATE', 'START_TIME', 'END_TIME'],
        list: schedules,
        type: 'fix'
    });  
});

module.exports = router;