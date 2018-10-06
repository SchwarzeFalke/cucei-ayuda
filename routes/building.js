const { Router } = require('express');

const { buildingCtrl } = require('../controllers');
const middleWares = require('../middlewares');

const router = Router();

router.get('/', buildingCtrl.getAll);

router.get('/:buildingId', (req, res, next) => {
    const request = middleWares.validator.code(req.params.buildingId);
    if(!request) {
      next();
    }else {
      res.send(request);
      console.log(request);
    }

},buildingCtrl.getBuild);

router.get('/:buildingId/classes', buildingCtrl.getClasses);

router.post('/', buildingCtrl.insert);

router.put('/:buildingId', buildingCtrl.update);

module.exports = router;
