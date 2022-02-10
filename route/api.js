const router = require('express-promise-router')();



// DIVIDE THE ROUTES ACCORDING TO THE DATA WHATEVER
// router.use("/",(req,res) => {
//     res.render('reg_form');
// })
router.get("/", (req,res) => {
    // const id = (req.user === null)? null : req.user.id;
    // console.log(`${id} logged in`);
     res.send('you logged in');
});

//router.use("/signup",require('./signup'));
//router.use("/login",require('./login'));

module.exports = router;