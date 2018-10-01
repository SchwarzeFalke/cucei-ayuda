/**
 * @Author: schwarze_falke
 * @Date:   2018-09-21T19:19:18-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-26T17:52:25-05:00
 */
 require('dotenv').config();

 const express = require('express');
 const router = require('./routes');
 const app = express();

 app.use(router);

 app.listen(process.env.PORT, () => console.log('Example app listening on port 3000!'));
