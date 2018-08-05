require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import dashboardRoutes from './routes/dashboard';
import appRoutes from './routes/index';


const app = express();
const Sequelize = require('sequelize');

const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/config/config.js')[env];



const SequelizeStore = require('connect-session-sequelize')(session.Store);
if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use("/pub", express.static(path.join(__dirname, "pub")));


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(session({
    secret: "Very Secret Code",
    store: new SequelizeStore({
        db: sequelize
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000,
        httpOnly: false
    } // 5 minutes
}));

//Routes
app.use('/', appRoutes);
app.use('/dashboard', dashboardRoutes);


app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});


module.exports = app;
