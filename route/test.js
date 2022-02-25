// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_departments = require('../database/db-dept');
const db_tests = require('../database/db-test');
const db_medicines = require('../database/db-medicine');

const router = express.Router({ mergeParams : true });

router.get('/', async(req, res) => {
    let tests = await db_tests.getAllTests();

    res.render('admin-tests', {
        tableTitle: 'Tests', 
        columns: ['ID', 'NAME', 'FEE', 'ROOM_ID'],
        list: tests,
        type: 'test'
    });  
});


// get a specific employee by his id
router.get('/id/:id', async(req, res) => {
    let tempTest = await db_tests.getTestById(req.params.id);
    let test = tempTest[0];

    res.render('admin-test-info', {
        tableTitle: 'Test', 
        columns: ['ID', 'NAME', 'FEE', 'ROOM_ID'],
        list: test,
        type: 'test'
    });    
});

router.get('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    let test = await db_tests.getTestById(req.params.id);

    res.render('admin-test-form', {
        formTitle: 'Edit Test', 
        list: test[0],
        postLink: '/admin/test/id/:id/edit'
        // depts: depts,
        // wards: wards
    });  
});

router.post('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    //console.log('he');
    const test = req.body;
    console.log(test);

    db_tests.editTest(test);
    res.redirect('/admin/test');
});

router.get('/add', async(req, res) => {
    res.render('admin-test-add-form', {
        formTitle: 'Add New Test',
        postLink: '/admin/test/add'
    });  
});

router.post('/add', async(req, res) => {
    const test = req.body;

    console.log(test);
    db_tests.addTest(test);
    res.redirect('/admin/test');
});

router.get('/id/:id/delete', async(req, res) => {
    //console.log(req.params.d_id, req.params.w_id);
    db_tests.deleteTest(req.params.id);
    res.redirect('/admin/test');
});

module.exports = router;