// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_diagnosises = require('../database/db-diagnosis');

const router = express.Router({ mergeParams : true });

router.get('/', async(req, res) => {
    let diagnosises = await db_diagnosises.getAllDiagnosises();

    res.render('admin-tests', {
        tableTitle: 'Diagnosises', 
        columns: ['ID', 'DOCTOR_ID', 'PATIENT_ID', 'TEST_ID', 'RESULT'],
        list: diagnosises,
        type: 'diagnosis'
    });  
});


// get a specific employee by his id
router.get('/id/:id', async(req, res) => {
    let tempDiagnosis = await db_diagnosises.getDiagnosisById(req.params.id);
    let diagnosis = tempDiagnosis[0];

    res.render('admin-test-info', {
        tableTitle: 'Diagnosis', 
        columns: ['ID', 'DOCTOR_ID', 'PATIENT_ID', 'TEST_ID', 'RESULT'],
        list: diagnosis,
        type: 'diagnosis'
    });    
});

router.get('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    let diagnosis = await db_diagnosises.getDiagnosisById(req.params.id);

    res.render('admin-diagnosis-update-form', {
        formTitle: 'Edit Diagnosis', 
        list: diagnosis[0],
        postLink: '/admin/diagnosis/id/:id/edit'
        // depts: depts,
        // wards: wards
    });  
});

router.post('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    //console.log('he');
    const diagnosis = req.body;
    console.log(diagnosis);

    db_diagnosises.editDiagnosis(diagnosis);
    res.redirect('/admin/diagnosis');
});

router.get('/add', async(req, res) => {
    res.render('admin-diagnosis-add-form', {
        formTitle: 'Add New Diagnosis',
        postLink: '/admin/diagnosis/add'
    });  
});

router.post('/add', async(req, res) => {
    const diagnosis = req.body;

    console.log(diagnosis);
    db_diagnosises.addDiagnosis(diagnosis);
    res.redirect('/admin/diagnosis');
});

router.get('/id/:id/delete', async(req, res) => {
    //console.log(req.params.d_id, req.params.w_id);
    db_diagnosises.deleteDiagnosis(req.params.id);
    res.redirect('/admin/diagnosis');
});

module.exports = router;