const { Router } = require('express');
const { teacherCtrl } = require('../controllers');

// const middlewares = require('../middlewares/forum');

const router = Router();

router.get('/teachers', teacherCtrl.getAll);
router.get('/teachers/:teachersId', teacherCtrl.get);
router.get('/teachers/:teachersId/rate', teacherCtrl.getRate);
router.get('/teachers/:teachersId/rate/:scheduleId', teacherCtrl.getRateSchedule);


router.post('/teachers/', teacherCtrl.create);
router.post('/teachers', teacherCtrl.create);
router.post('/teachers', teacherCtrl.create);

router.put('/teachers/:teacherId', teacherCtrl.update);
router.delete('/teachers/:teacherId', teacherCtrl.delete);
