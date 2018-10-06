const { Router } = require('express');

const { routeCtrl } = require('../controllers');

const router = Router();

router.get('/routes', routeCtrl.get);

module.exports = router;
