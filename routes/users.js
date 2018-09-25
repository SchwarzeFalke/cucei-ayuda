/**
 * @Author: root
 * @Date:   2018-09-18T09:45:53-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-24T23:52:09-05:00
 */

const { Router } = require('express');

const middleWares = require('../middlewares');

const { usersCtrl } = require('../controllers');

const router = Router();

/**
 The next block code reffers to all GET methods of USERS resource, which
 includes the next resources:
 GET /users
 GET /users/userId
 GET /users/userId/map
 GET /users/userId/routes
 GET /users/userId/schedule
 GET /users/userId/posts
 GET /users/userId/posts/postId
 Block code beggining line: 29
 Block code ending line: 234
*/

/**
 * GET users/
 * @type {Array} Return all users from database
 */
router.get('/', usersCtrl.getAll);

/**
 * GET users/userId
 * @type {Object} Returns a specific user through its identifier
 */
router.get('/:userId', middleWares.validateId, usersCtrl.get);

/**
 * GET users/userId/map
 * @type {Object} Returns the identifier of an specific user's map
 */
router.get('/:userId/map', usersCtrl.get);

/**
 * GET users/userId/routes
 * @type {Array} Returns all routes from a specific user through its identifier
 * "start" and "end" attributes reffers to a starting point and an ending point
 */
router.get('/:userId/routes', usersCtrl.get);

/**
 * GET users/userId/schedule
 * @type {Object} Returns the schedule's identifier from an specific user
 */
router.get('/:userId/schedule', usersCtrl.get);

/**
 * GET users/userId/posts
 * @type {Array} Returns all publications by the given user
 */
router.get('/:userId/posts', usersCtrl.get);

/**
 * The next block code reffers to all modification methods of USERS resource,
 * which includes the next resources:
 * POST /users
 * PUT /users
 * DELETE /users
 * Block code beggining line: 247
 * Block code ending line: 234
 */

/**
 * POST /users
 * @type {Object} Create a new user by given name, middle name, last name, email
 * and a password. Returns an ok response.
 */
router.post('/', usersCtrl.insert);

router.delete('/:userId', usersCtrl.del);

module.exports = router;
