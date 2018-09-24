/**
 * @Author: schwarze_falke
 * @Date:   2018-09-23T22:45:17-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-23T23:56:17-05:00
 */

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
