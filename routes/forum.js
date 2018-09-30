const { Router } = require('express');
const { threadCtrl } = require('../controllers');
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
router.get('/threads/:threadId/posts', threadCtrl.get);
router.get('/threads/:threadId/posts/:postId', threadCtrl.get);

router.get('/teachers');
router.get('/teachers/:teachersId');
router.get('/teachers/:teachersId/rate');
router.get('/teachers/:teachersId/rate/:scheduleId');

router.get('/topics');
router.get('/topics/:topicsId');

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
router.post('/threads/:threadId/posts');
router.post('/teachers');
router.post('/topics');

/**
 * This are all the PUT methods for the forum page.

 * PUT /threads/:threadId
 * PUT /threads/:threadId/posts/:postId

 * PUT /teachers/:teacherId

 * PUT /topics/:topicId
 */

router.put('/threads/:threadId');
router.put('/threads/:threadId/posts/:postId');
router.put('/teachers/:teacherId');
router.put('/topics/:topicId');
/**
 * delete routes
 *
 * DELETE /threads/:threadId
 * DELETE /threads/:threadId/posts/:postId
 * DELETE /teachers/:teacherId
 * DELETE /topics/:topicId
 */
router.delete('/threads/:threadId', threadCtrl.delete);
router.delete('/threads/:threadId/posts/:postId');
router.delete('/teachers/:teacherId');
router.delete('/topics/:topicId');

module.exports = router;
