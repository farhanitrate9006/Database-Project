// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_employees = require('../database/db-employee');

const db_departments = require('../database/db-dept');
const db_tests = require('../database/db-test');
const db_medicines = require('../database/db-medicine');

const router = express.Router({ mergeParams : true });

// get all employees
router.get('/all', async(req, res) => {
    let deptObj = await db_departments.getAllDepartments();
    let testObj = await db_tests.getAllTests();
    let medicineObj = await db_medicines.getAllMedicines();

    let employeesObj = await db_employees.getAllEmployees();
    // let employees = [];

    // for(let i = 0; i<employeesObj.length; i++){
    //     employees.push(employeesObj[i]);
    //     //console.log(employeesObj[i]);
    // }

    res.render('table', {
        depts: deptObj,
        tests: testObj,
        medicines: medicineObj,
        tableTitle: 'All Employees',
        list: employeesObj,
        columns: ['ID', 'NAME', 'JOB_TYPE', 'SALARY']
    });   
});

// get a specific employee by his id
router.get('/:id', async (req, res) => {
    // returns a list with 1 employee
    let deptObj = await db_departments.getAllDepartments();
    let testObj = await db_tests.getAllTests();
    let medicineObj = await db_medicines.getAllMedicines();

    let employee = await db_employees.getEmployeeById(req.params.id);
    res.render('table', {
        depts: deptObj,
        tests: testObj,
        medicines: medicineObj,
        list: employee
    });  
});

module.exports = router;