require('dotenv').config();
const express = require('express');
const { redirect } = require('express/lib/response');

const db_login = require('../database/db-login');
const db_schedules = require('../database/db-schedule');
const db_departments = require('../database/db-dept');
const db_tests = require('../database/db-test');
const db_medicines = require('../database/db-medicine');

const router = express.Router({ mergeParams : true });

const redirectLogin = (req, res, next) => {
    if (!req.session.userID){
        res.redirect('/login');
    } else {
        next();
    }
}

const redirectDash = (req, res, next) => {
    if (req.session.userID){
        res.redirect('/login/dashboard');
    } else {
        next();
    }
}


router.get('/', redirectDash, (req, res) => {
    res.render('login');
});

router.post('/', async (req, res)=> {
    const { email, password } = req.body;


    if (email === process.env.ADMIN_NAME && password === process.env.ADMIN_PASS){
        req.session.admin = true;
        res.status(200).json({ admin: true });
    }
    else{
        let user = await db_login.findOne(email);

        if(user.length === 1) 
        {
            user = user[0];
            if(password === user.PASSWORD) 
            {
                req.session.userID = user.ID;
                res.status(200).json({ user: user.ID });
            }
            else{
                res.status(400).json({ errors: {password: 'Incorrect password'} })
            }
            
        }
        else{
            res.status(400).json({ errors: {email: 'Incorrect email'} })
        }
    }
});

router.get('/dashboard', redirectLogin, async (req, res) => {

    const { userID } = req.session;

    let deptObj = await db_departments.getAllDepartments();
    let testObj = await db_tests.getAllTests();
    let medicineObj = await db_medicines.getAllMedicines();

    try {
        let user = await db_login.findOneByID(userID);
        user = user[0];
        let schedules = await db_schedules.getScheduleByDoc(userID);
    
        res.render('log-doctor', {
            depts: deptObj,
            tests: testObj,
            medicines: medicineObj,
            tableTitle: 'My Schedules',
            list: schedules,
            columns: ['APPOINT_DATE', 'START_TIME', 'END_TIME', 'SLOTS']
        });
    } catch (err) {
        console.log(err);
    }


});

router.post('/logout', async (req, res) => {
    req.session.destroy( err => {
        if (err){
            return res.redirect('/');
        }

        res.clearCookie(process.env.SESSION_NAME);
        res.redirect('/login');
    });
})


module.exports = router;