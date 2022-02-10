// libraries
require('dotenv').config();
const express = require('express');

const db_employees = require('../database/db-employee');

const router = express.Router({ mergeParams : true });

router.get('/all', async (req, res) => {
    let tagsObj = await db_employees.getAllEmployees();
    let employees = [];
    for(let i = 0; i<tagsObj.length; i++){
        employees.push(tagsObj[i]);
        //console.log(tagsObj[i]);
    }

    res.render('table.ejs', {
        employees: employees
    });   
});

//TODO add contest linking to blog
router.post('/:id', async (req, res, next)=> {
    let employee = await db_employees.getEmployeeById(req.params.id);
    res.render('table.ejs', {
        employees: employee
    });  
});

module.exports = router;