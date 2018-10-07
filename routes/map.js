/**
 * @Author: schwarze_falke
 * @Date:   2018-09-23T22:45:17-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-24T10:23:03-05:00
 */

const { Router } = require('express');

const { mapCtrl } = require('../controllers');

const router = Router();

router.get('/', mapCtrl.getAll);

router.get('/:mapId', mapCtrl.get);

router.post('/', mapCtrl.insert);

router.put('/mapId', mapCtrl.update);

module.exports = router;
