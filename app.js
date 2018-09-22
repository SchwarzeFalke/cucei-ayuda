/**
 * @Author: schwarze_falke
 * @Date:   2018-09-13T13:50:03-05:00
 * @Last modified by:   root
 * @Last modified time: 2018-09-19T02:41:31-05:00
*/
require(' dotenv ').config();
const express = require('express');


const app = express();
const router = require('./routes');

app.use(router);

app.listen(process.env.PORT, () => console.log('My cute app is running on port 3000!'));
