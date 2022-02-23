// libraries
require('dotenv').config();
const express = require('express');
const db_employees = require('../database/db-employee');

const router = express.Router({ mergeParams : true });

const redirectAdmin = (req, res, next) => {
    if (!req.session.admin){
        res.redirect('/login');
    } else {
        next();
    }
}

// get a specific employee by his id
router.get('/', async(req, res) => {
    let employeesObj = await db_employees.getAllEmployees();
    // let employees = [];

    // for(let i = 0; i<employeesObj.length; i++){
    //     employees.push(employeesObj[i]);
    //     //console.log(employeesObj[i]);
    // }

    res.render('admin-employees', {
        tableTitle: 'All Employees',
        list: employeesObj,
        columns: ['ID', 'NAME', 'JOB_TYPE']
    });   
});

router.use('/employee', require('./employee'));
router.use('/dept', require('./admin-dept'));
router.use('/ward', require('./ward'));
router.use('/room', require('./room'));
router.use('/bed', require('./bed'));
router.use('/schedule', require('./schedule'));
router.use('/appointment', require('./admin-appointment'));
router.use('/record', require('./record'));
// router.use('/test', require('./test'));
// router.use('/medicine', require('./medicine'));

module.exports = router