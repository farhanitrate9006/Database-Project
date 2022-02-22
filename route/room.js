// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_departments = require('../database/db-dept');
const db_rooms = require('../database/db-room');
const db_wards = require('../database/db-ward');

const router = express.Router({ mergeParams : true });

router.get('/', async(req, res) => {
    // returns a list with 1 employee
    let rooms = await db_rooms.getAllRooms();
    //console.log(rooms);

    res.render('admin-rooms', {
        tableTitle: 'Rooms', 
        columns: ['ROOM_ID', 'BEDS', 'WARD_NO', 'DEPT_NAME'],
        list: rooms
    });  
});

// get a specific employee by his id
router.get('/id/:id', async(req, res) => {
    // returns a list with 1 employee
    let rooms = await db_rooms.getRoomById(req.params.id);

    res.render('admin-room-info', {
        tableTitle: 'Room', 
        columns: ['ROOM_ID', 'BEDS', 'WARD_NO', 'DEPT_NAME'],
        list: rooms[0]
    });  
});

// get a specific employee by his id
router.get('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    let rooms = await db_rooms.getRoomById(req.params.id);
    let depts = await db_departments.getAllDepartments();
    let wards = await db_wards.getAllWards();

    res.render('admin-room-form', {
        formTitle: 'Edit Room', 
        list: rooms[0],
        postLink: '/admin/room/id/:id/edit',
        depts: depts,
        wards: wards
    });  
});

router.post('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    console.log('he');
    const room = req.body;
    console.log(room);

    db_rooms.editRoom(room);
    res.redirect('/admin/room');
});

router.get('/add', async(req, res) => {
    let depts = await db_departments.getAllDepartments();
    let wards = await db_wards.getAllWards();

    res.render('admin-room-form', {
        formTitle: 'Add New Room',
        postLink: '/admin/room/add',
        depts: depts,
        wards: wards
    });  
});

router.post('/add', async(req, res) => {
    // returns a list with 1 employee
    //console.log('she');
    //console.log(req.body);
    const room = req.body;

    db_rooms.addRoom(room);
    res.redirect('/admin/room');
});

router.get('/id/:id/delete', async(req, res) => {
    //console.log(req.params.d_id, req.params.w_id);
    db_rooms.deleteRoom(req.params.id);
    res.redirect('/admin/room');
});

module.exports = router;