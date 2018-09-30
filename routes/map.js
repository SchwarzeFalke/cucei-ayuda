const { Router } = require('express');

const { mapCtrl } = require('../controllers');

const router = Router();

router.get('/', mapCtrl.getAll);

router.get('/:mapId', mapCtrl.get);

router.get('/buildings', mapCtrl.getAll);

router.get('/:buildingId', mapCtrl.get);

router.get('/:buildingId/classes', mapCtrl.getClasses);

router.get('/routes', mapCtrl.getAll);

router.get('/:routeId', mapCtrl.get);

module.exports = router;
