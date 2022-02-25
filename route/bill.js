require('dotenv').config();
const express = require('express');

const db_bills = require('../database/db-bill');

const router = express.Router({ mergeParams : true });

router.get('/', async(req, res) => {
    let bills = await db_bills.getAllBills();

    res.render('admin-tests', {
        tableTitle: 'Bills', 
        columns: ['ID', 'ROOM_CHARGE', 'MEDICINE_CHARGE', 'TREATMENT_CHARGE'],
        list: bills,
        type: 'bill'
    });  
});


router.get('/id/:id', async(req, res) => {
    let tempBill = await db_bills.getBillById(req.params.id);
    let bill = tempBill[0];

    res.render('admin-test-info', {
        tableTitle: 'Bill', 
        columns: ['ID', 'ROOM_CHARGE', 'MEDICINE_CHARGE', 'TREATMENT_CHARGE'],
        list: bill,
        type: 'bill'
    });    
});

router.get('/add', async(req, res) => {
    res.render('admin-bill-add-form', {
        formTitle: 'Add New Bill',
        postLink: '/admin/bill/add'
    });  
});

router.post('/add', async(req, res) => {
    const bill = req.body;

    console.log(bill);
    db_bills.addBill(bill);
    res.redirect('/admin/bill');
});

router.get('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    let bill = await db_bills.getBillById(req.params.id);

    res.render('admin-bill-update-form', {
        formTitle: 'Edit Bill', 
        list: bill[0],
        postLink: '/admin/bill/id/:id/edit'
        // depts: depts,
        // wards: wards
    });  
});

router.post('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    //console.log('he');
    const bill = req.body;
    console.log(bill);

    db_bills.editBill(bill);
    res.redirect('/admin/bill');
});

router.get('/id/:id/delete', async(req, res) => {
    //console.log(req.params.d_id, req.params.w_id);
    db_bills.deleteBill(req.params.id);
    res.redirect('/admin/bill');
});

module.exports = router;