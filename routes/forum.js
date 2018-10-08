const { Router } = require('express');
const { threadCtrl } = require('../controllers');
const { topicCtrl } = require('../controllers');
const { forumMid } = require('../middlewares');

const router = Router();

/**
 * ALL GET methods for the forum
 */

router.get('/', forumMid.noEmptySearch, topicCtrl.getAll);
router.get('/:topicId', forumMid.validateNumberParams, topicCtrl.get);
router.get('/:topicId/threads', threadCtrl.getAll);
router.get('/:topicId/threads/:threadId', [forumMid.validateNumberParams,
  forumMid.validateNumberParamsThread], threadCtrl.get);
router.get('/:topicId/threads/:threadId/posts',
threadCtrl.getAllPosts);
router.get('/:topicId/threads/:threadId/posts/:postId', [
  forumMid.validateNumberParams, forumMid.validateNumberParamsThread,
  forumMid.validateNumberParamsPost], threadCtrl.getPost);

/**
 * ALL POST methods for the forum
 */

router.post('/', forumMid.noEmptyPostTopic, topicCtrl.create);
router.post('/:topicId/threads', [forumMid.noEmptyPostThread,
  forumMid.validateNumberParams], threadCtrl.create);
router.post('/:topicId/threads/:threadId/posts', [forumMid.noEmptyPost,
  forumMid.validateNumberParams,
  forumMid.validateNumberParamsThread], threadCtrl.createPost);

/**
 * This are all the PUT methods for the forum page.

 * PUT /:topicId
 * PUT /:topicId/threads/:threadId
 * PUT /:topicId/threads/:threadId/posts/:postId

 */

router.put('/:topicId', [forumMid.validateNumberParams], topicCtrl.modify);
router.put('/:topicId/threads/:threadId', [forumMid.validateNumberParams,
  forumMid.validateNumberParamsThread], threadCtrl.modify);
router.put('/:topicId/threads/:threadId/posts/:postId',
  [forumMid.validateNumberParams,
    forumMid.validateNumberParamsThread,
    forumMid.validateNumberParamsPost], threadCtrl.updatePost);

/**
 * delete routes
 * DELETE /:topicId
 * DELETE /:topicId/threads/:threadId
 * DELETE /:topicId/threads/:threadId/posts/:postId
 */

router.delete('/:topicId', [forumMid.validateNumberParams], topicCtrl.delete);
router.delete('/:topicId/threads/:threadId', [forumMid.validateNumberParams,
  forumMid.validateNumberParamsThread], threadCtrl.delete);
router.delete('/:topicId/threads/:threadId/posts/:postId',
  [forumMid.validateNumberParams, forumMid.validateNumberParamsThread,
    forumMid.validateNumberParamsPost], threadCtrl.deletePost);


module.exports = router;
