/**
 * @Author: root
 * @Date:   2018-09-18T09:46:30-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-23T23:33:50-05:00
 */

const { Router } = require('express');

const bodyParser = require('body-parser');

const usersRouter = require('./users');
const scheduleRouter = require('./schedule');
const forumRouter = require('./forum');
const mapRouter = require('./map');

const router = Router();

router.use(bodyParser.json()); // for parsing routerlication/json
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => res.send('Welcome to QCInf!'));

router.use('/users', usersRouter);
router.use('/schedule', scheduleRouter);
router.use('/topics', forumRouter);
router.use('/map', mapRouter);

module.exports = router;
