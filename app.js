// libraries
const express = require('express');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
// const cookieParser = require('cookie-parser');

// middlewares/
// const errorHandling = require('./middlewares/errorHandling');
// const auth = require('./middlewares/auth');

// app creation
const app = express();

// using libraries
// app.use(fileUpload({ createParentPath : true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false, 
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000*60*60*20,
        sameSite: true,
        
    }
}))
// app.use(cookieParser());
// app.use(auth);
// app.use(morgan('tiny'));

// setting ejs to be view engine
app.set('view engine', 'ejs');

// allow public directory
app.use(express.static('public'));

//app.set('strict routing', true);
// using router
app.use('/', require('./route/api'));

// using error handling middlware
// app.use(errorHandling.notFound);
// app.use(errorHandling.errorHandler);

module.exports = app;