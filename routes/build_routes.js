const { Router } = require('express');

const { routeCtrl } = require('../controllers');

const router = Router();

router.get('/routes', routeCtrl.get);

router.get('/:routesId', routeCtrl.getone);

router.post('/', routeCtrl.insert);

router.put('/routesId', routeCtrl.update);

module.exports = router;
