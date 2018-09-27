/*
 * Definition of schedule routing
 */

const { Router } = require('express');
const scheduleCtrl = require('../controllers/schedule.js')
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
router.get('/:scheduleId', scheduleCtrl.get);

// GET /schedule/:scheduleId/subjects
// Returns all subjects of a method
// router.get('/:scheduleId/subjects', ());

// POST /schedule
router.post('/', scheduleCtrl.insert);

// PUT /schedule/:scheduleId
router.put('/:scheduleId', scheduleCtrl.update);

// DELETE /schedule/:scheduleId
router.delete('/:scheduleId', scheduleCtrl.del);

module.exports = router;
