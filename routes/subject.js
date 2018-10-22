/*
 * Definition of subject routing
 */

const { Router } = require('express');

const middleWares = require('../middlewares');

const { subjectCtrl } = require('../controllers');
// const middleWares = require('../middlewares');

const router = Router();

/**
  * These are all the GET methods for the subjects.
  * GET /subject
  * GET /subject/:subjectId
  * GET /subject/:subjectId/subjects
  */

// GET /subject  Returns all subjects
router.get('/', subjectCtrl.getAll);

// GET /subject/:subjectId    returns specific subject
// FIXME Falta un middleware para validar que el param :nrc es un identificador valido
router.get('/:nrc', subjectCtrl.getSubject);

// GET /subject/:subjectId/subjects
// Returns all subjects of a method
// router.get('/:subjectId/subjects', ());

// POST /subject

router.post('/', [middleWares.subjectM.validateNrc,
  middleWares.subjectM.validateName,
  middleWares.subjectM.validateFirstDay,
  middleWares.subjectM.validateSecDay,
  middleWares.subjectM.validateSection,
  middleWares.subjectM.validateClass,
  middleWares.subjectM.validateCR,
  middleWares.subjectM.validateBuilding,
  middleWares.subjectM.validateTeacher], subjectCtrl.insert);

// PUT /subject/:subjectId
// FIXME Falta validar el cuerpo del request
// FIXME Falta un middleware para validar que el param :nrc es un identificador valido
router.put('/:nrc', [middleWares.subjectM.validateNrcP,
  middleWares.subjectM.validateNrc,
  middleWares.subjectM.validateName,
  middleWares.subjectM.validateFirstDay,
  middleWares.subjectM.validateSecDay,
  middleWares.subjectM.validateSection,
  middleWares.subjectM.validateClass,
  middleWares.subjectM.validateCR,
  middleWares.subjectM.validateBuilding,
  middleWares.subjectM.validateTeacher], subjectCtrl.update);

// DELETE /subject/:subjectId
// FIXME Falta un middleware para validar que el param :nrc es un identificador valido
router.delete('/:nrc', middleWares.subjectM.validateNrcP, subjectCtrl.del);

module.exports = router;
