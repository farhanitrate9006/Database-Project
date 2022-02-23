// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_departments = require('../database/db-dept');
const db_tests = require('../database/db-test');
const db_medicines = require('../database/db-medicine');

const router = express.Router({ mergeParams : true });

// get a specific employee by his id
router.get('/', async(req, res) => {
    // returns a list with 1 employee
    let deptObj = await db_departments.getAllDepartments();
    let testObj = await db_tests.getAllTests();
    let medicineObj = await db_medicines.getAllMedicines();

    res.render('appointment', {
        depts: deptObj,
        tests: testObj,
        medicines: medicineObj
    });  
});

module.exports = router;