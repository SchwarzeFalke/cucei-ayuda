/*
 * Definition of schedule routing
 */

const { Router } = require('express');

const middleWares = require('../middlewares');

const { scheduleCtrl } = require('../controllers');
// const middleWares = require('../middlewares');

const router = Router();

/**
  * These are all the GET methods for the schedules.
  * GET /schedule
  * GET /schedule/:scheduleId
  * GET /schedule/:scheduleId/subjects
  */

// GET /schedule  Returns all schedules
router.get('/', scheduleCtrl.getAll);

// GET /schedule/:scheduleId    returns specific schedule
router.get('/:nrc', scheduleCtrl.getSubject);

// GET /schedule/:scheduleId/subjects
// Returns all subjects of a method
// router.get('/:scheduleId/subjects', ());

// POST /schedule
router.post('/', [middleWares.scheduleM.validateNrc, middleWares.scheduleM.validateName, middleWares.scheduleM.validateFirstDay, middleWares.scheduleM.validateSecDay, middleWares.scheduleM.validateSection, middleWares.scheduleM.validateClass, middleWares.scheduleM.validateCR, middleWares.scheduleM.validateBuilding, middleWares.scheduleM.validateTeacher], scheduleCtrl.insert);

// PUT /schedule/:scheduleId
router.put('/:scheduleId', scheduleCtrl.update);

// DELETE /schedule/:scheduleId
router.delete('/:scheduleId', scheduleCtrl.del);

module.exports = router;
