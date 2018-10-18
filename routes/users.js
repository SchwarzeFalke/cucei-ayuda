/**
 * @Author: root
 * @Date:   2018-09-18T09:45:53-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-18T00:48:58-05:00
 */

const { Router } = require('express');

const middleWares = require('../middlewares');

const { usersCtrl } = require('../controllers');

const userFaker = require('../factory');

const router = Router();

/**
 The next block code reffers to all GET methods of USERS resource, which
 includes the next resources:
 GET /users
 GET /users/userId
 GET /users/userId/routes
 GET /users/userId/schedule
 GET /users/userId/posts
*/

router.post('/login', [middleWares.Auth.login]);

router.get('/fakeData/:amount', (req, res) => {
  userFaker.fakeUsers(req.params.amount);
  res.send('Ok');
});

/**
 * GET users/
 * @type {Array} Return all users from database
 */
router.get('/', usersCtrl.getAll);

/**
 * GET users/userId
 * @type {Object} Returns a specific user through its identifier
 */
router.get('/:userId', (req, res, next) => {
  const request = middleWares.validator.code(req.params.userId);
  if (!request) {
    next();
  } else { res.send(request); console.log(request); }
}, usersCtrl.getUser);

/**
 * GET users/userId/routes
 * @type {Array} Returns all routes from a specific user through its identifier
 * "start" and "end" attributes reffers to a starting point and an ending point
 */
router.get('/:userId/roads', usersCtrl.getRoads);

/**
 * GET users/userId/schedule
 * @type {Object} Returns the schedule's identifier from an specific user
 */
router.get('/:userId/schedule', usersCtrl.getSchedule);

/**
 * GET users/userId/posts
 * @type {Array} Returns all publications by the given user
 */
router.get('/:userId/posts', usersCtrl.getPosts);

/**
 * The next block code reffers to all modification methods of USERS resource,
 * which includes the next resources:
 * POST /users
 * PUT /users
 * DELETE /users
 */

/**
 * POST /users
 * @type {Object} Create a new user by given name, middle name, last name, email
 * and a password. Returns an ok response.
 */
router.post('/', usersCtrl.insertUser);

router.post('/:userId/schedule', usersCtrl.insertSchedule);

router.put('/:userId', usersCtrl.update);

router.delete('/:userId', usersCtrl.del);

module.exports = router;
