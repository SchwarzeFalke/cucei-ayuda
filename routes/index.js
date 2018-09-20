/**
 * @Author: root
 * @Date:   2018-09-18T09:46:30-05:00
 * @Last modified by:   root
 * @Last modified time: 2018-09-18T10:21:52-05:00
 */

const { Router } = require('express');

const bodyParser = require('body-parser');

const usersRouter = require('./users');

const scheduleRouter = require('./schedule');

const router = Router();

router.use(bodyParser.json()); // for parsing routerlication/json
router.use(bodyParser.urlencoded({ extended: true }));
router.get('/', (req, res) => res.send('Hello world!'));
router.use('/users', usersRouter);
router.use('/schedule', scheduleRouter);

module.exports = router;
