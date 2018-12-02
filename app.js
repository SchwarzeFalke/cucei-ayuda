// FIXME Los atributos usados para documentacion son en minusculas y de estos solo author es valido
/**
 * @Author: schwarze_falke
 * @Date:   2018-09-21T19:19:18-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-07T20:36:49-05:00
 */
require('dotenv').config();

const express = require('express');

const app = express();

const router = require('./routes');
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(router);

app.listen(process.env.PORT, () => console.log(`CUCEI AYUDA IS RUNNING ON PORT ${process.env.PORT}!`));
