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
        list: wards,
        type: 'ward'
    });  
});

// get a specific employee by his id
router.get('/id/:d_id/:w_no', async(req, res) => {
    // returns a list with 1 employee
    let wards = await db_wards.getWardById(req.params.d_id, req.params.w_no);

    res.render('admin-ward-info', {
        tableTitle: 'Ward', 
        columns: ['WARD_NO', 'DEPT_NAME'],
        list: wards[0],
        type: 'ward'
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
        postLink: '/admin/ward/id/:d_id/:w_no/edit',
        depts: depts
    });  
});

router.post('/id/:d_id/:w_no/edit', async(req, res) => {
    // returns a list with 1 employee
    console.log('he');
    const ward = req.body;
    console.log(ward);

    db_wards.editWard(ward);
    res.redirect('/admin/ward');
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
    //console.log('she');
    //console.log(req.body);
    const ward = req.body;

    db_wards.addWard(ward);
    res.redirect('/admin/ward');
});

router.get('/id/:d_id/:w_no/delete', async(req, res) => {
    //console.log(req.params.d_id, req.params.w_no);
    db_wards.deleteWard(req.params.d_id, req.params.w_no);
    res.redirect('/admin/ward');
});

module.exports = router;