require('dotenv').config();

const express = require('express');


const app = express();

const router = require('./routes');

app.use(router);

app.listen(process.env.PORT, () => console.log('My cute app is running on port 3000!'));
