// libraries
require('dotenv').config();
const express = require('express');
const db_employees = require('../database/db-employee');

const router = express.Router({ mergeParams : true });

// get a specific employee by his id
router.get('/', async(req, res) => {
    let employeesObj = await db_employees.getAllEmployees();
    // let employees = [];

    // for(let i = 0; i<employeesObj.length; i++){
    //     employees.push(employeesObj[i]);
    //     //console.log(employeesObj[i]);
    // }

    res.render('admin-manage', {
        tableTitle: 'All Employees',
        list: employeesObj,
        columns: ['ID', 'NAME', 'JOB_TYPE']
    });   
});

router.use('/employee', require('./employee'));

module.exports = router