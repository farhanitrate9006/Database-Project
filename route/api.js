//const router = require('express-promise-router')();

// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const router = express.Router({ mergeParams : true });

const db_departments = require('../database/db-dept');
const db_tests = require('../database/db-test');
const db_medicines = require('../database/db-medicine');

const db_employees = require('../database/db-employee');
// DIVIDE THE ROUTES ACCORDING TO THE DATA WHATEVER
// router.use("/",(req,res) => {
//     res.render('reg_form');
// })

router.get('/', async(req, res) => {
    // const id = (req.user === null)? null : req.user.id;
    // console.log(`${id} logged in`);
    //res.send('you logged in');

    let deptObj = await db_departments.getAllDepartments();
    let testObj = await db_tests.getAllTests();
    let medicineObj = await db_medicines.getAllMedicines();

    // console.log(deptObj)
    // console.log(testObj)
    // console.log(medicineObj)

    res.render('home', { 
        depts: deptObj,
        tests: testObj,
        medicines: medicineObj,
        title: 'Home'
    });
    
});

// router.use("/signup",require('./signup'));
// router.use("/login",require('./login'));
// router.use('/employee', require('./employee'));
router.use('/dept', require('./dept'));
router.use('/test', require('./test'));
router.use('/medicine', require('./medicine'));
router.use('/appointment', require('./appointment'));
router.use('/admin', require('./admin'));
router.use('/login', require('./login'));

module.exports = router;