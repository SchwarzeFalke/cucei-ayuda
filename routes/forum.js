const { Router } = require('express');
const { threadCtrl } = require('../controllers');
// const { teacherCtrl } = require('../controllers');
const { topicCtrl } = require('../controllers');
const middlewares = require('../middlewares/forum')
const router = Router();

/**
 * This are all the GET methods for the forum page.
 * GET /forum/posts
 * GET /forum/posts/:postsId
 * GET /forum/posts/:postsId/comments
 * GET /forum/posts/:postsId/comments/:commentsId

 * GET /forum/teachers
 * GET /forum/teachers/:teachersId
 * GET /forum/teachers/:teachersId/comments
 * GET /forum/teachers/:teachersId/comments/:commentsId

 * GET /forum/threads
 * GET /forum/threads/:newsId
 * GET /forum/news/:newsId/comments
 * GET /forum/news/:newsId/comments/:commentsId

 */
router.get('/threads', threadCtrl.getAll);
router.get('/threads/:threadId', threadCtrl.get);
router.get('/threads/posts/:postId', threadCtrl.getPost);
router.get('/threads/:threadId/posts', threadCtrl.getAllPosts);
// router.get('/threads/:threadId/posts/:postId', threadCtrl.getPostThread);

// router.get('/teachers', teacherCtrl.getAll);
// router.get('/teachers/:teachersId', teacherCtrl.get);
// router.get('/teachers/:teachersId/rate', teacherCtrl.getRate);
// router.get('/teachers/:teachersId/rate/:scheduleId', teacherCtrl.getRateSchedule);

// router.get('/topics', topicCtrl.getAll);
// router.get('/topics/:topicsId', topicCtrl.get);

/**
 * This are all the POST methods for the forum page.

 * POST /forum/posts
 * POST /forum/posts/:postsId/comments

 * POST /forum/teachers
 * POST /forum/teachers/:teachersId/comments

 * POST /forum/news
 * POST /forum/news/:newsId/comments
 */

router.post('/threads', threadCtrl.create);
router.post('/threads/:threadId/posts', threadCtrl.createPost);
// router.post('/teachers', teacherCtrl.create);
// router.post('/topics', topicCtrl.create);

/**
 * This are all the PUT methods for the forum page.

 * PUT /threads/:threadId
 * PUT /threads/:threadId/posts/:postId

 * PUT /teachers/:teacherId

 * PUT /topics/:topicId
 */

router.put('/threads/:threadId', threadCtrl.modify);
router.put('/threads/:threadId/posts/:postId', threadCtrl.updatePost);
// router.put('/teachers/:teacherId', teacherCtrl.update);
// router.put('/topics/:topicId', topicCtrl.update);
/**
 * delete routes
 *
 * DELETE /threads/:threadId
 * DELETE /threads/:threadId/posts/:postId
 * DELETE /teachers/:teacherId
 * DELETE /topics/:topicId
 */
router.delete('/threads/:threadId', threadCtrl.delete);
router.delete('/threads/:threadId/posts/:postId', threadCtrl.deletePost);
// router.delete('/teachers/:teacherId', teacherCtrl.delete);
// router.delete('/topics/:topicId', topicCtrl.delete);

module.exports = router;
