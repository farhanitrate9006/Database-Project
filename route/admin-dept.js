// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_depts = require('../database/db-dept');

const router = express.Router({ mergeParams : true });

router.get('/', async(req, res) => {
    // returns a list with 1 employee
    let depts = await db_depts.getAllDepartments();
    //console.log(depts);

    res.render('admin-wards', {
        tableTitle: 'Departments', 
        columns: ['ID', 'NAME'],
        list: depts,
        type: 'dept'
    });  
});

// get a specific employee by his id
router.get('/id/:id', async(req, res) => {
    // returns a list with 1 employee
    let depts = await db_depts.getDepartmentById(req.params.id);

    res.render('admin-ward-info', {
        tableTitle: 'Departments', 
        columns: ['ID', 'NAME'],
        list: depts[0],
        type: 'dept'
    });  
});

// get a specific employee by his id
router.get('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    let depts = await db_departments.getDepartmentById(req.params.id);

    res.render('admin-dept-form', {
        formTitle: 'Edit Department', 
        list: depts[0],
        postLink: '/admin/dept/id/:id/edit'
    });  
});

router.post('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    console.log('he');
    const dept = req.body;
    console.log(dept);

    db_depts.editRoom(dept);
    res.redirect('/admin/dept');
});

router.get('/add', async(req, res) => {
    res.render('admin-dept-form', {
        formTitle: 'Add New Department',
        postLink: '/admin/dept/add'
    });  
});

router.post('/add', async(req, res) => {
    // returns a list with 1 employee
    //console.log('she');
    //console.log(req.body);
    const dept = req.body;

    db_depts.addDept(dept);
    res.redirect('/admin/dept');
});

router.get('/id/:id/delete', async(req, res) => {
    //console.log(req.params.d_id, req.params.w_id);
    db_depts.deleteDept(req.params.id);
    res.redirect('/admin/dept');
});

module.exports = router;