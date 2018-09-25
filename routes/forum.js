const { Router } = require('express');
const { postCtrl } = require('../controllers');
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
router.get('/teachers/:teachersId/comments');
router.get('/teachers/:teachersId/comments/:commentsId');


/**
 * This are all the POST methods for the forum page.

 * POST /forum/posts
 * POST /forum/posts/:postsId/comments

 * POST /forum/teachers
 * POST /forum/teachers/:teachersId/comments

 * POST /forum/news
 * POST /forum/news/:newsId/comments
 */

/**
 * Create a post
 */
router.post('/thread', threadCtrl.create);

/**
 * Create a comment on a post
 */
router.post('/posts/:postsId/comments', (req,res) =>{
  const json = {
    response: 'New comment created successfully!',
    data: {
      id: 4345,
      text: 'Contenido de la publicación',
    },
  };
  res.send(json);

});

/**
 * Create a new teacher
 */
router.post('/teachers',(req,res) =>{
  const json = {
    response: 'New teacher created successfully!',
    data: {
      id: 4345,
      subject: 'algoritmia',
      department: 'ingenieria',
      name: 'fdsaf',
    },
  };
  res.send(json);

});

/**
 * comment a teacher
 */
router.post('/teachers/:teachersId/comments',(req,res) =>{
  const json = {
    response: 'New comment created successfully!',
    data: {
      id: 4345,
      text: 'Contenido de la publicación',
    },
  };
  res.send(json);

});

/**
 * Create a news
 */
router.post('/news/',(req,res) =>{
  const json = {
    response: 'News created successfully!',
    data: {
      id: 4345,
      text: 'Contenido de la publicación',
    },
  };
  res.send(json);

});
/**
 * Comment a news
 */
router.post('/news/:newsId/comments',(req,res) =>{
  const json = {
    response: 'New comment created successfully!',
    data: {
      id: 4345,
      text: 'Contenido de la publicación',
    },
  };
  res.send(json);

});
/**
 * This are all the PUT methods for the forum page.

 * PUT /forum/posts
 * PUT /forum/posts/:postsId/comments

 * PUT /forum/teachers
 * PUT /forum/teachers/:teachersId/comments

 * PUT /forum/news
 * PUT /forum/news/:newsId/comments
 */

router.put('/posts',(req,res) => {
  const json = {
    response: 'New post created successfully!',
    data: {
      id: 4345,
      text: 'modificado',
      modifiedAt: 14/12/18,
    },
  };
  res.send(json);

});

router.put('/posts/:postsId/comments', (req,res) =>{
  const json = {
    response: 'New comment created successfully!',
    data: {
      id: 4345,
      text: 'modificado',
      modifiedAt: 14/12/18,
    },
  };
  res.send(json);

});

/**
 * Create a new teacher
 */
router.put('/teachers',(req,res) =>{
  const json = {
    response: 'New teacher created successfully!',
    data: {
      id: 4345,
      name: 'new name',
      subject: 'algoritmia',
      department: 'ingenieria',
      modifiedAt: 14/12/18,
    },
  };
  res.send(json);

});

/**
 * comment a teacher
 */
router.put('/teachers/:teachersId/comments',(req,res) =>{
  const json = {
    response: 'Modified successfully!',
    data: {
      id: 4345,
      text: 'Contenido de la publicación modificado',
      modifiedAt: 14/12/18,
    },
  };
  res.send(json);

});

/**
 * Create a news
 */
router.put('/news/',(req,res) =>{
  const json = {
    response: 'modified successfully!',
    data: {
      id: 4345,
      text: 'Contenido de la publicación modificado',
      modifiedAt: 14/12/18,
    },
  };
  res.send(json);

});

router.put('/news/:newsId/comments',(req,res) =>{
  const json = {
    response: 'modified successfully!',
    data: {
      id: 4345,
      text: 'Coenido modificado',
      modifiedAt: 14/12/18,
    },
  };
  res.send(json);

});

router.delete('/posts/:postsId', (req,res) =>{});
router.delete('/posts/:postsId/comments/:commentsId', (req,res) =>{});
router.delete('/teachers/:teachersId',(req,res)=>{ });
router.delete('/teachers/:teachersId/comments/:commentsId',(req,res)=>{ });
router.delete('/topics/:topicId',(req,res)=>{ });

module.exports = router;
