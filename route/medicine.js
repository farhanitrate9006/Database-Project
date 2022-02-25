// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_medicines = require('../database/db-medicine');

const router = express.Router({ mergeParams : true });

router.get('/', async(req, res) => {
    let medicines = await db_medicines.getAllMedicines();

    res.render('admin-tests', {
        tableTitle: 'Medicines', 
        columns: ['ID', 'NAME', 'PRICE'],
        list: medicines,
        type: 'medicine'
    });  
});

// get a specific employee by his id
router.get('/id/:id', async(req, res) => {
    let tempMed = await db_medicines.getMedicineById(req.params.id);
    let medicine = tempMed[0];

    res.render('admin-test-info', {
        tableTitle: 'Medicine', 
        columns: ['ID', 'NAME', 'PRICE'],
        list: medicine,
        type: 'medicine'
    });  
});

router.get('/id/:id/edit', async(req, res) => {
    let medicine = await db_medicines.getMedicineById(req.params.id);

    res.render('admin-medicine-form', {
        formTitle: 'Edit Medicine', 
        list: medicine[0],
        postLink: '/admin/medicine/id/:id/edit'
        // depts: depts,
        // wards: wards
    });  
});

router.post('/id/:id/edit', async(req, res) => {
    const medicine = req.body;
    console.log(medicine);

    db_medicines.editMedicine(medicine);
    res.redirect('/admin/medicine');
});

router.get('/add', async(req, res) => {
    res.render('admin-medicine-add-form', {
        formTitle: 'Add New Medicine',
        postLink: '/admin/medicine/add'
    });  
});

router.post('/add', async(req, res) => {
    const medicine = req.body;

    console.log(medicine);
    db_medicines.addMedicine(medicine);
    res.redirect('/admin/medicine');
});

router.get('/id/:id/delete', async(req, res) => {
    //console.log(req.params.d_id, req.params.w_id);
    db_medicines.deleteMedicine(req.params.id);
    res.redirect('/admin/medicine');
});

module.exports = router;