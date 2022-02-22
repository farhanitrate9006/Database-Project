// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_departments = require('../database/db-dept');
const db_rooms = require('../database/db-room');
const db_beds = require('../database/db-bed');

const router = express.Router({ mergeParams : true });

router.get('/', async(req, res) => {
    // returns a list with 1 employee
    let beds = await db_beds.getAllBeds();
    //console.log(beds);

    res.render('admin-wards', {
        tableTitle: 'Beds', 
        columns: ['BED_NO', 'ROOM_ID', 'WARD_NO', 'DEPT_NAME'],
        list: beds,
        type: 'bed'
    });  
});

// get a specific employee by his id
router.get('/id/:r_id/:b_no', async(req, res) => {
    // returns a list with 1 employee
    //console.log('he');
    let beds = await db_beds.getBedById(req.params.r_id, req.params.b_no);

    res.render('admin-ward-info', {
        tableTitle: 'Bed', 
        columns: ['BED_NO', 'ROOM_ID', 'WARD_NO', 'DEPT_NAME'],
        list: beds[0],
        type: 'bed'
    });  
});

// get a specific employee by his id
router.get('/id/:r_id/:b_no/edit', async(req, res) => {
    // returns a list with 1 employee
    let beds = await db_beds.getBedById(req.params.r_id, req.params.b_no);
    let rooms = await db_rooms.getAllRooms();

    res.render('admin-bed-form', {
        formTitle: 'Edit Ward', 
        list: beds[0],
        postLink: '/admin/bed/id/r_id,/b_no/edit',
        depts: depts
    });  
});

router.post('/id/:r_id/:b_no/edit', async(req, res) => {
    // returns a list with 1 employee
    console.log('he');
    const bed = req.body;
    console.log(bed);

    db_beds.editBed(bed);
    res.redirect('/admin/bed');
});

router.get('/add', async(req, res) => {
    let rooms = await db_rooms.getAllRooms();
    res.render('admin-bed-form', {
        formTitle: 'Add New Bed',
        postLink: '/admin/bed/add',
        rooms: rooms
    });  
});

router.post('/add', async(req, res) => {
    // returns a list with 1 employee
    //console.log('she');
    //console.log(req.body);
    const bed = req.body;

    db_beds.addBed(bed);
    res.redirect('/admin/bed');
});

router.get('/id/:r_id/:b_no/delete', async(req, res) => {
    //console.log(req.params.r_id, req.params.b_no);
    db_beds.deleteBed(req.params.r_id, req.params.b_no);
    res.redirect('/admin/bed');
});

module.exports = router;