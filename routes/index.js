const { Router } = require('express');

const router = Router();

const bodyParser = require('body-parser');

const mapRouter = require('./map');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.use('/map', mapRouter);

module.exports = router;
