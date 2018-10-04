const { Router } = require('express');
const { threadCtrl } = require('../controllers');
const { topicCtrl } = require('../controllers');

// const middlewares = require('../middlewares/forum')

const router = Router();

/**
 * ALL GET methods for the forum
 */

router.get('/', topicCtrl.getAll);
router.get('/:topicId', topicCtrl.get);
router.get('/:topicId/threads', threadCtrl.getAll);
router.get('/:topicId/threads/:threadId', threadCtrl.get);
// router.get('/:topicId/threads/posts/:postId', threadCtrl.getPost);
// router.get('/:topicId/threads/:threadId/posts', threadCtrl.getAllPosts);
// router.get('/:topicId/threads/:threadId/posts/:postId', threadCtrl.getPostThread);

/**
 * ALL POST methods for the forum
 */

router.post('/', topicCtrl.create);
router.post('/:topicId/threads', threadCtrl.create);
router.post('/:topicId/threads/:threadId/posts', threadCtrl.createPost);

/**
 * This are all the PUT methods for the forum page.

 * PUT /:topicId
 * PUT /:topicId/threads/:threadId
 * PUT /:topicId/threads/:threadId/posts/:postId

 */

router.put('/:topicId', topicCtrl.modify);
router.put('/:topicId/threads/:threadId', threadCtrl.modify);
router.put('/:topicId/threads/:threadId/posts/:postId', threadCtrl.updatePost);

/**
 * delete routes
 * DELETE /:topicId
 * DELETE /:topicId/threads/:threadId
 * DELETE /:topicId/threads/:threadId/posts/:postId
 */

router.delete('/:topicId', topicCtrl.delete);
router.delete('/:topicId/threads/:threadId', threadCtrl.delete);
router.delete('/:topicId/threads/:threadId/posts/:postId', threadCtrl.deletePost);


module.exports = router;
