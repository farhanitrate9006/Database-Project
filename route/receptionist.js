require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_employees = require('../database/db-employee');

const router = express.Router({ mergeParams : true });

// get all employees
router.get('/', async(req, res) => {
    let receptionists = await db_employees.getReceptionists();
    res.render('staff', {
        tableTitle: 'Receptionists',
        list: receptionists,
        columns: ['ID', 'RECEPTIONIST_NAME', 'DESK_NUMBER'],
    });   
});

module.exports = router;