// FIXME Los atributos usados para documentacion son en minusculas y de estos solo author es valido
/**
 * @author: JulioMariscal
 */

const { Router } = require('express');

// FIXME se pueden cargar los dos controllers en una sola linea
const { mapCtrl, buildingCtrl } = require('../controllers');
const middleWares = require('../middlewares');

const router = Router();

/**
 * [GET /map]
 * @type {Array} Return all buildings from database
 */
router.get('/', mapCtrl.get);

/**
 * [GET /map/building/buildingId]
 * @type {Array} Returns a specific building through its identifier
 */
router.get('/building/:buildingId', (req, res, next) => {
    const request = middleWares.validator.code(req.params.buildingId);
    if (!request) {
        next();
    } else {
        res.send(request);
        console.log(request);
    }
}, buildingCtrl.getBuild);

// esport routes maps
module.exports = router;
