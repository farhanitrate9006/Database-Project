// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_departments = require('../database/db-dept');
const db_wards = require('../database/db-ward');

const router = express.Router({ mergeParams : true });

router.get('/', async(req, res) => {
    // returns a list with 1 employee
    let wards = await db_wards.getAllWards();
    //console.log(wards);

    res.render('admin-wards', {
        tableTitle: 'Wards', 
        columns: ['WARD_NO', 'DEPT_NAME'],
        list: wards
    });  
});

// get a specific employee by his id
router.get('/id/:d_id/:w_no', async(req, res) => {
    // returns a list with 1 employee
    let wards = await db_wards.getWardById(req.params.d_id, req.params.w_no);

    res.render('admin-ward-info', {
        tableTitle: 'Ward', 
        columns: ['WARD_NO', 'DEPT_NAME'],
        list: wards[0]
    });  
});

// get a specific employee by his id
router.get('/id/:d_id/:w_no/edit', async(req, res) => {
    // returns a list with 1 employee
    let wards = await db_wards.getWardById(req.params.d_id, req.params.w_no);
    let depts = await db_departments.getAllDepartments();

    res.render('admin-ward-form', {
        formTitle: 'Edit Ward', 
        list: wards[0],
        postLink: '/:d_id/:w_no/edit',
        depts: depts
    });  
});

router.post('/id/:d_id/:w_no/edit', async(req, res) => {
    // returns a list with 1 employee
    let wards = await db_wards.getWardById(req.params.d_id, req.params.w_no);
    let ward = wards[0];

    let depts = await db_departments.getAllDepartments();

    console.log('he');
});

router.get('/add', async(req, res) => {
    let depts = await db_departments.getAllDepartments();
    res.render('admin-ward-form', {
        formTitle: 'Add New Ward',
        postLink: '/admin/ward/add',
        depts: depts
    });  
});

router.post('/add', async(req, res) => {
    // returns a list with 1 employee
    console.log('she');
    console.log(req.body);
    const doctor = req.body;

    db_doctors.addDoctor(doctor);
    res.redirect('/admin/ward');
});

module.exports = router;