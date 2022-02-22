// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const db_departments = require('../database/db-dept');
const db_schedules = require('../database/db-schedule');
const db_doctors = require('../database/db-doctor');

const router = express.Router({ mergeParams : true });

router.get('/', async(req, res) => {
    // returns a list with 1 employee
    let schedules = await db_schedules.getAllSchedules();
    //console.log(schedules);

    res.render('admin-wards', {
        tableTitle: 'Schedules', 
        columns: ['ID', 'DOC_ID', 'START_DATE', 'END_DATE', 'SLOTS'],
        list: schedules,
        type: 'schedule'
    });  
});

// get a specific employee by his id
router.get('/id/:id', async(req, res) => {
    // returns a list with 1 employee
    let schedules = await db_schedules.getScheduleById(req.params.id);

    res.render('admin-ward-info', {
        tableTitle: 'Schedule', 
        columns: ['ID', 'DOC_ID', 'START_DATE', 'END_DATE', 'START_TIME', 'END_TIME', 'SLOTS'],
        list: schedules[0],
        type: 'schedule'
    });  
});

// get a specific employee by his id
router.get('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    let schedules = await db_schedules.getScheduleById(req.params.id);
    let depts = await db_departments.getAllDepartments();
    let wards = await db_wards.getAllWards();

    res.render('admin-schedule-form', {
        formTitle: 'Edit Schedule', 
        list: schedules[0],
        postLink: '/admin/schedule/id/:id/edit',
        depts: depts,
        wards: wards
    });  
});

router.post('/id/:id/edit', async(req, res) => {
    // returns a list with 1 employee
    console.log('he');
    const schedule = req.body;
    console.log(schedule);

    db_schedules.editSchedule(schedule);
    res.redirect('/admin/schedule');
});

router.get('/add', async(req, res) => {
    let doctors = await db_doctors.getAllDoctors();

    res.render('admin-schedule-form', {
        formTitle: 'Add New Schedule',
        postLink: '/admin/schedule/add',
        doctors: doctors
    });  
});

router.post('/add', async(req, res) => {
    // returns a list with 1 employee
    //console.log('she');
    console.log(req.body);
    const schedule = req.body;

    db_schedules.addSchedule(schedule);
    res.redirect('/admin/schedule');
});

router.get('/id/:id/delete', async(req, res) => {
    //console.log(req.params.d_id, req.params.w_id);
    db_schedules.deleteSchedule(req.params.id);
    res.redirect('/admin/schedule');
});

module.exports = router;