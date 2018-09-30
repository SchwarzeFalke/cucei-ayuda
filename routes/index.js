const { Router } = require('express');

const bodyParser = require('body-parser');

const mapRouter = require('./map');

const router = Router();

router.use('/map', mapRouter);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => res.send('Welcome to QCInf!'));

module.exports = router;
