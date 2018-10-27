// FIXME Los atributos usados para documentacion son en minusculas y de estos solo author es valido
/**
 * @Author: root
 * @Date:   2018-09-18T09:46:30-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-26T21:36:35-05:00
 */

const { Router } = require('express');

const bodyParser = require('body-parser');

const auth = require('../middlewares/auth');

const usersRouter = require('./users');
const subjectRouter = require('./subject');
const forumRouter = require('./forum');
const mapRouter = require('./map');
const buildingRouter = require('./building');

const auth = require('./auth');
const mailer = require('../mail');

const router = Router();

// FIXME Estos middlewares deben ir en app.js
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(auth.haveSession);

router.get('/', (req, res) => res.send('Welcome to QCInf!'));
router.get('/mail', (req, res) => {
  const mailOptions = {
    from: 'cuceiayuda@gmail.com', // sender address
    to: 'autor.cvp303@gmail.com', // list of receivers
    subject: 'Hello', // Subject line
    html: '<b>Hello here!</b>',
  };
  mailer.sendMail(mailOptions);
});

router.use('/users', usersRouter);
router.use('/subject', subjectRouter);
router.use('/topics', forumRouter);
router.use('/map', mapRouter);
router.use('/building', buildingRouter);
router.use('/auth', auth);

module.exports = router;
