// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_employees = require('../database/db-employee');

const router = express.Router({ mergeParams : true });

// get all employees
router.get('/', async(req, res) => {
    let employeesObj = await db_employees.getAllEmployees();
    res.render('admin-manage', {
        tableTitle: 'All Employees',
        list: employeesObj,
        columns: ['ID', 'NAME', 'JOB_TYPE']
    });   
});

// get a specific employee by his id
router.get('/id/:id', async(req, res) => {
    // returns a list with 1 employee
    let employee = await db_employees.getEmployeeById(req.params.id);
    res.render('table', {
        tableTitle: 'Employee',
        list: employee,
        columns: ['ID', 'NAME', 'JOB_TYPE']
    });  
});

router.use('/doctor', require('./doctor'));

module.exports = router;