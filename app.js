/**
 * @Author: schwarze_falke
 * @Date:   2018-09-21T19:19:18-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-08T03:10:20-05:00
 */
require('dotenv').config();

const express = require('express');

const app = express();

const router = require('./routes');

app.use(router);

app.listen(process.env.PORT || 5000);
