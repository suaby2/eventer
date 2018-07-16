import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import session from 'express-session';

import panelRoutes from './routes/panel';

const app = express();

app.set('view engine', 'pug');

app.use(session({
    store: new (require('connect-pg-simple')(session))(),
    secret: 'mynewsecretcode',
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Log requests to the console.
app.use(logger('dev'));

//Routes
app.use('/panel', panelRoutes);


app.get('/', (req, res) => {res.render('index');});


module.exports = app;
