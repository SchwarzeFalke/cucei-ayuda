const { Router } = require('express');

const { mapCtrl } = require('../controllers');

const router = Router();

router.get('/', mapCtrl.getAll);

router.get('/:mapId', mapCtrl.get);

router.post('/', mapCtrl.insert);

router.put('/mapId', mapCtrl.update);

module.exports = router;
