// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_bought = require('../database/db-buys');

const router = express.Router({ mergeParams : true });

router.get('/', async(req, res) => {
    let buys = await db_bought.getAllBuys();

    res.render('admin-buys', {
        tableTitle: 'Buys', 
        columns: ['PATIENT_ID', 'MEDICINE_ID', 'AMOUNT'],
        list: buys,
        type: 'buys'
    });  
});


router.get('/id/:p_id/:m_id', async(req, res) => {
    // returns a list with 1 employee
    let buys = await db_bought.getBuyById(req.params.p_id, req.params.m_id);

    res.render('admin-buy-info', {
        tableTitle: 'Medicine Bought', 
        columns: ['PATIENT_ID', 'MEDICINE_ID', 'AMOUNT'],
        list: buys[0],
        type: 'buys'
    });  
});

// get a specific employee by his id
router.get('/id/:p_id/:m_id/edit', async(req, res) => {
    // returns a list with 1 employee
    let buys = await db_bought.getBuyById(req.params.p_id, req.params.m_id);
    //let depts = await db_departments.getAllDepartments();

    res.render('admin-buy-edit-form', {
        formTitle: 'Edit Buying History', 
        list: buys[0],
        postLink: '/admin/buys/id/:p_id/:m_id/edit',
        //depts: depts
    });  
});

router.post('/id/:p_id/:m_id/edit', async(req, res) => {
    // returns a list with 1 employee
    //console.log('he');
    const buys = req.body;
    console.log(buys);

    db_bought.editBuys(buys);
    res.redirect('/admin/buys');
});

router.get('/add', async(req, res) => {
    res.render('admin-buy-form', {
        formTitle: 'Add New Buying History',
        postLink: '/admin/buys/add',
    });  
});

router.post('/add', async(req, res) => {
    const buys = req.body;

    db_bought.addBuy(buys);
    res.redirect('/admin/buys');
});

router.get('/id/:p_id/:m_id/delete', async(req, res) => {
    //console.log(req.params.d_id, req.params.w_no);
    db_bought.deleteBuy(req.params.p_id, req.params.m_id);
    res.redirect('/admin/buys');
});


module.exports = router;