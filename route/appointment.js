// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_departments = require('../database/db-dept');
const db_tests = require('../database/db-test');
const db_medicines = require('../database/db-medicine');
const db_appointments = require('../database/db-appointment');

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

// get a specific employee by his id
router.get('/:id/fill', async(req, res) => {
    // returns a list with 1 employee
    let deptObj = await db_departments.getAllDepartments();
    let testObj = await db_tests.getAllTests();
    let medicineObj = await db_medicines.getAllMedicines();
    //doc_id = req.params.id;

    res.render('appointment-form', {
        depts: deptObj,
        tests: testObj,
        medicines: medicineObj,
        
        list: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
        //title: 'Thanks for booking appointment. Stay connected'
    });  
});

router.post('/:id/fill', async(req, res) => {
    // returns a list with 1 employee
    console.log(req.body);
    appoint_date = req.body.appoint_date;
    start_time = req.body.start_time;
    end_time = req.body.end_time;
    doc_id = req.body.doc_id;

    res.redirect('/appointment/' + req.params.id + '/fill');
});

router.post('/fill', async(req, res) => {
    // returns a list with 1 employee
    let deptObj = await db_departments.getAllDepartments();
    let testObj = await db_tests.getAllTests();
    let medicineObj = await db_medicines.getAllMedicines();
    console.log(req.body);
    console.log(appoint_date);

    
    db_appointments.fixAppointment({
        appoint_date: appoint_date,
        start_time: start_time,
        doc_id: doc_id,
        name: req.body.name,
        age: req.body.age,
        blood_group: req.body.blood_group
    });

    res.render('home', {
        depts: deptObj,
        tests: testObj,
        medicines: medicineObj,
        title: 'Thanks for booking appointment. Stay connected'
    });  
});

module.exports = router;