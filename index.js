import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import panelRoutes from './routes/panel';

const app = express();

app.set('view engine', 'pug');

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Log requests to the console.
app.use(logger('dev'));

//Routes
app.use('/panel', panelRoutes);


app.get('/', (req, res) => {res.render('index');});;


module.exports = app;
