/**
 * @Author: schwarze_falke
 * @Date:   2018-09-23T22:45:17-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-24T10:23:03-05:00
 */

const { Router } = require('express');

const { mapCtrl } = require('../controllers');
const { buildingCtrl } = require('../controllers');
const middleWares = require('../middlewares');

const router = Router();

router.get('/', mapCtrl.get);

router.get('/building/:buildingId', (req, res, next) => {
    const request = middleWares.validator.code(req.params.buildingId);
    if(!request) {
      next();
    }else {
      res.send(request);
      console.log(request);
    }

},buildingCtrl.getBuild);

//router.get('/building/:buildingId/', if(req.query) {buildingCtrl.getClasses}else {buildingCtrl.getBuild});

module.exports = router;
