require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
const app = express();
const Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/config/config.js')[env];

const SequelizeStore = require('connect-session-sequelize')(session.Store);
if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(session({
    secret: "Very Secret Code",
    store: new SequelizeStore({
        db: sequelize
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 10 * 1000,
        httpOnly: false
    } // 5 minutes
}));



// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Log requests to the console.
app.use(logger('dev'));


//Routes
import panelRoutes from './routes/panel';
app.use('/panel', panelRoutes);

app.use(function(req, res, next) {
    console.log(req.session);
    console.log("=====================");
    console.log(req.cookies);
    next();
});


app.get('/', (req, res) => {
    res.render('index');
});
app.get('/dashboard', (req, res) => {
    if(req.session && req.session.user) {
        res.render('dashboard', {user: req.session.user});
    } else {
        res.redirect('/panel/login')
    }

});
app.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) return next(err)
        res.redirect('/panel/login')
    })
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});


module.exports = app;
