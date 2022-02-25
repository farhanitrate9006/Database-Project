require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_employees = require('../database/db-employee');

const router = express.Router({ mergeParams : true });

// get all employees
router.get('/', async(req, res) => {
    let nurses = await db_employees.getNurses();
    res.render('staff', {
        tableTitle: 'Nurses',
        list: nurses,
        columns: ['ID', 'NURSE_NAME', 'WORK_HOUR'],
    });   
});

module.exports = router;