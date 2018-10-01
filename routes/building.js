const { Router } = require('express');

const { buildingCtrl } = require('../controllers');

const router = Router();

router.get('/', buildingCtrl.getAll);

router.get('/:buildingId', buildingCtrl.getBuild);

router.get('/:buildingId/classes', buildingCtrl.getClasses);

router.post('/', buildingCtrl.insert);

router.put('/buildingId', buildingCtrl.update);

module.exports = router;
