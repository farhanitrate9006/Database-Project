// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_employees = require('../database/db-employee');

const router = express.Router({ mergeParams : true });

// get all employees
router.get('/', async(req, res) => {
    let employeesObj = await db_employees.getAllEmployees();
    res.render('admin-employees', {
        tableTitle: 'All Employees',
        list: employeesObj,
        columns: ['ID', 'NAME', 'JOB_TYPE']
    });   
});

// get a specific employee by his id
router.get('/id/:id', async(req, res) => {
    // returns a list with 1 employee
    // let employees = await db_employees.getEmployeeById(req.params.id);
    // res.render('admin-employee', {
    //     tableTitle: 'Employee Info',
    //     list: employees[0],
    //     columns: ['ID', 'NAME', 'JOB_TYPE']
    // });
    res.redirect('/admin/employee/doctor/id/' + req.params.id);  
});

router.get('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    // let employees = await db_employees.getEmployeeById(req.params.id);
    // res.render('admin-employee', {
    //     tableTitle: 'Employee Info',
    //     list: employees[0],
    //     columns: ['ID', 'NAME', 'JOB_TYPE']
    // });
    res.redirect('/admin/employee/doctor/id/' + req.params.id + '/edit');  
});

router.use('/doctor', require('./doctor'));

module.exports = router;