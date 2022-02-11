// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_employees = require('../database/db-employee');

const router = express.Router({ mergeParams : true });

// get all employees
router.get('/all', async(req, res) => {
    let employeesObj = await db_employees.getAllEmployees();
    // let employees = [];

    // for(let i = 0; i<employeesObj.length; i++){
    //     employees.push(employeesObj[i]);
    //     //console.log(employeesObj[i]);
    // }

    res.render('table', {
        list: employeesObj,
        columns: ['ID', 'NAME', 'JOB_TYPE', 'SALARY']
    });   
});

// get a specific employee by his id
router.get('/:id', async (req, res) => {
    // returns a list with 1 employee
    let employee = await db_employees.getEmployeeById(req.params.id);
    res.render('table', {
        list: employee
    });  
});

module.exports = router;