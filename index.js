require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

import panelRoutes from './routes/panel';

const app = express();

app.set('view engine', 'pug');

const SessionStore = require('express-session-sequelize')(expressSession.Store);

const Sequelize = require('sequelize');
const myDatabase = new Sequelize('eventer', 'postgres', 'postgres', {
    host: '127.0.0.1',
    dialect: 'postgres',
});

const sequelizeSessionStore = new SessionStore({
    db: myDatabase,
});


app.use(cookieParser());
app.use(expressSession({
    key: 'user_sid',
    secret: process.env.COOKIE_SECRET,
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Log requests to the console.
app.use(logger('dev'));

//Routes
app.use('/panel', panelRoutes);


app.get('/', (req, res) => {
    console.log(req.session);
    res.render('index');
});

app.get('/logout', (req, res) => {
   req.session.destroy();
   res.send('Logout Successful');
});


module.exports = app;
