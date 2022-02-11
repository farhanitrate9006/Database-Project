// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_departments = require('../database/db-dept');

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
router.get('/:id', async (req, res) => {
    // returns a list with 1 employee
    let deptObj = await db_departments.getAllDepartments();
    let tempDept = await db_departments.getDepartmentById(req.params.id);
    let dept = tempDept[0];

    res.render('dept', {
        dept: dept,
        depts: deptObj
    });  
});

module.exports = router;