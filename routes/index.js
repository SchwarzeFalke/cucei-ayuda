const { Router } = require('express');

const bodyParser = require('body-parser');

const usersRouter = require('./users');
//const mapRouter = require('./map');
const buildingRouter = require('./building');
//const routeRouter = require('./route');

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => res.send('Welcome to QCInf!'));

router.use('/users', usersRouter);
//router.use('/map', mapRouter);
router.use('/building', buildingRouter);
//router.use('/route', routeRouter);

module.exports = router;
