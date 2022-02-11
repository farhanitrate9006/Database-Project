//const router = require('express-promise-router')();

// libraries
require('dotenv').config();
const express = require('express');

//app.use(bodyParser.json());

const router = express.Router({ mergeParams : true });

const db_departments = require('../database/db-dept');
// DIVIDE THE ROUTES ACCORDING TO THE DATA WHATEVER
// router.use("/",(req,res) => {
//     res.render('reg_form');
// })

router.get('/', async(req, res) => {
    // const id = (req.user === null)? null : req.user.id;
    // console.log(`${id} logged in`);
    //res.send('you logged in');
    let deptObj = await db_departments.getAllDepartments();
    res.render('home', { depts: deptObj });
});

//router.use("/signup",require('./signup'));
//router.use("/login",require('./login'));
router.use('/employee', require('./employee'));
router.use('/dept', require('./dept'));

module.exports = router;