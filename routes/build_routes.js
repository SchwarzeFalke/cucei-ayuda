const { Router } = require('express');

const { routeCtrl } = require('../controllers');

const router = Router();

router.get('/routes', routeCtrl.getAll);

router.get('/:routesId', routeCtrl.get);

router.post('/', routeCtrl.insert);

router.put('/routesId', routeCtrl.update);

module.exports = router;
