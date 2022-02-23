// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_records = require('../database/db-record');

const router = express.Router({ mergeParams : true });

router.get('/', async(req, res) => {
    // returns a list with 1 employee
    let records = await db_records.getAllRecords();
    //console.log(records);

    res.render('admin-wards', {
        tableTitle: 'Records', 
        columns: ['ID', 'PATIENT_ID'],
        list: records,
        type: 'record'
    });  
});

// get a specific employee by his id
router.get('/id/:id', async(req, res) => {
    // returns a list with 1 employee
    let records = await db_records.getRecordById(req.params.id);

    res.render('admin-ward-info', {
        tableTitle: 'Record', 
        columns: ['ID', 'PATIENT_ID'],
        list: records[0],
        type: 'record'
    });  
});

// get a specific employee by his id
router.get('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    let records = await db_records.getDepartmentById(req.params.id);

    res.render('admin-record-form', {
        formTitle: 'Edit Department', 
        list: records[0],
        postLink: '/admin/record/id/:id/edit'
    });  
});

router.post('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    console.log('he');
    const record = req.body;
    console.log(record);

    db_records.editRoom(record);
    res.redirect('/admin/record');
});

router.get('/add', async(req, res) => {
    res.render('admin-record-form', {
        formTitle: 'Add New Department',
        postLink: '/admin/record/add'
    });  
});

router.post('/add', async(req, res) => {
    // returns a list with 1 employee
    //console.log('she');
    //console.log(req.body);
    const record = req.body;

    db_records.addDept(record);
    res.redirect('/admin/record');
});

router.get('/id/:id/delete', async(req, res) => {
    //console.log(req.params.d_id, req.params.w_id);
    db_records.deleteRecord(req.params.id);
    res.redirect('/admin/record');
});

module.exports = router;