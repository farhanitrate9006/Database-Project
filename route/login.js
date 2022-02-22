require('dotenv').config();
const express = require('express');
const { redirect } = require('express/lib/response');

const db_login = require('../database/db-login');
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

    try {
        let user = await db_login.findOneByID(userID);
        user = user[0];
    
    res.send(`
        <h1>Dashboard</h1>
        <ul>
            <li>Name: ${user.ID}</li>
            <li>Email: ${user.EMAIL}</li>
            <li>Department: ${user.DEPARTMENT_ID}</li>
        </ul>
        <form method='post' action='/login/logout'>
            <button>Logout</button>
        </form>
    `)
    } catch (err){
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