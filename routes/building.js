// FIXME Los atributos usados para documentacion son en minusculas y de estos solo author es valido
/**
 * @author: JulioMariscal
 */

const { Router } = require('express');

const { buildingCtrl } = require('../controllers');
const middleWares = require('../middlewares');

const router = Router();

/**
 * These is Get methods needing for routes building
 * Get/building
 * Get/building/:buildingId
 */

/**
 * [GET /building]
 * @type {Array} Return all buildings from database
 */
router.get('/', buildingCtrl.getAll);

/**
 * [GET /building/buildingId]
 * @type {Array} Returns a specific building through its identifier
 */
router.get('/:buildingId', (req, res, next) => {
    const request = middleWares.validator.code(req.params.buildingId);
    if (!request) {
        next();
    } else {
        res.send(request);
        console.log(request);
    }
}, buildingCtrl.getBuild);


// FIXME Falta middleware para validar el cuerpo del request
router.post('/', buildingCtrl.insert);

/**
 * [PUT /building/buildingId]
 * @type {Object} Create a new building by give name, latitude, longitude
 * and num_class. Returns an ok response.
 */
// FIXME Falta validar el param buildingId
router.put('/:buildingId', (req, res, next) => {
    const request = middleWares.validator.code(req.params.buildingId);
    if (!request) {
        next();
    } else {
        res.send(request);
        console.log(request);
    }
}, buildingCtrl.modify);

/**
 * [DELETE /building/buildingId]
 * @type {Object} Delete a specific building by logic delete
 */
// FIXME Falta validar el param buildingId
router.delete('/:buildingId', (req, res, next) => {
    const request = middleWares.validator.code(req.params.buildingId);
    if (!request) {
        next();
    } else {
        res.send(request);
        console.log(request);
    }
}, buildingCtrl.logDel);

module.exports = router;
