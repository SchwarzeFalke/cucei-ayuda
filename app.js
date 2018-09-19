/**
 * @Author: schwarze_falke
 * @Date:   2018-09-13T13:50:03-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-15T20:32:07-05:00
 */

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000, () => console.log('My cute app is running on port 3000!'));
