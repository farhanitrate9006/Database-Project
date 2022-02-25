require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_employees = require('../database/db-employee');

const router = express.Router({ mergeParams : true });

// get all employees
router.get('/', async(req, res) => {
    let staffs = await db_employees.getStaffs();
    res.render('staff', {
        tableTitle: '4th Grade Staff',
        list: staffs,
        columns: ['ID', 'STAFF_NAME', 'WORK_HOUR'],
        type: staffs
    });   
});

module.exports = router;