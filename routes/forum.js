const { Router } = require('express');

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

 * GET /forum/news
 * GET /forum/news/:newsId
 * GET /forum/news/:newsId/comments
 * GET /forum/news/:newsId/comments/:commentsId

 */
router.get('/posts',(req,res) => {
  const posts = [
    {
      id: 111,
      text:'Como se agenda?',
      likes: 1,
      userId: 4575,
      published: 14/10/12,
    },
    {
      id: 111,
      text:'Como se agenda?',
      likes: 1,
      userId: 4575,
      publishedAt: 14/10/12,
    },
  ];
  res.send(posts);
});
router.get('/posts/:postsId',(req,res) =>{
  const post = {
      id: req.params.postId,
      text:'Como se agenda?',
      likes: 1,
      userId: 4575,
      publishedAt: '14/10/12',
  };
  res.send(post);

});
router.get('/posts/:postsId/comments', (req,res) =>{
  const comments = [
    {
      id: 123,
      text: 'No es tu muro prro :v',
      likes: 1,
      postId:123,
      userId: 1233,
      publishedAt: '14/10/12',
    },
    {
      id: 123,
      text: 'No es tu muro prro :v',
      likes: 1,
      postId:123,
      userId: 1233,
      publishedAt: 14/10/12,
    },
  ];
  res.send(comments);
});
router.get('/posts/:postsId/comments/:commentsId', (req,res) =>{
  const comment = {
    id: req.params.commentsId,
    text: 'No es tu muro prro :v',
    likes: 1,
    postId:123,
    userId: 1233,
    publishedAt: 14/10/12,
  };
  res.send(comment);

});
router.get('/teachers/',(req,res) =>{
  const teachers = [
    {
      id: 123,
      name: 'El mugres',
      subject: 'algoritmia',
      department: 'ingenieria',
      positive: 1,
      negative: 2,
      publishedAt: 14/10/12,
    },
    {
      id: 123,
      name: 'El mugres',
      subject: 'algoritmia',
      department: 'ingenieria',
      positive: 1,
      negative: 2,
      publishedAt: 14/10/12,
    },
  ];
  res.send(teachers);

});
router.get('/teachers/:teachersId',(req,res) =>{
  const teacher = {
    id: req.params.teachersId,
    positive: 1,
    negative: 2,
    name: 'El mugres',
    subject: 'algoritmia',
    department: 'ingenieria',
    followers: 10,
  };
  res.send(teacher);

});
router.get('/teachers/:teachersId/comments',(req,res) =>{
  const comments = [
    {
      id: 123,
      text: 'fdsafasdfas',
      teacherId: 111,
      userId: 1213,
      likes: 1,
      publishedAt: 14/10/12,
    },
  ];
  res.send(comments);

});
router.get('/teachers/:teachersId/comments/:commentsId',(req,res) =>{
  const comment = {
    id: req.params.commentsId,
    text: 'fdsafasdfas',
    userId: 1213,
    teacherId: 111,
    likes: 1,
    publishedAt: 14/10/12,
  };
  res.send(comment);

});

router.get('/news',(req,res)  =>{
  const news = [
    {
      id: 11,
      title: 'dsafas',
      text: 'dsafasdf',
      image: 'fsfasdfas.jpg',
      publishedAt: '14/10/12',
      publishedBy: '12321',
    },
    {
      id: 11,
      title: 'dsafas',
      text: 'dsafasdf',
      image: 'fsfasdfas.jpg',
      publishedAt: '14/10/12',
      publishedBy: '12321',
    }
  ];
  res.send(news);

});
router.get('/news/:newsId',(req,res)  =>{
  const news = {
    id: 11,
    title: 'dsafas',
    text: 'dsafasdf',
    image: 'fsfasdfas.jpg',
    publishedAt: '14/10/12',
    publishedBy: '12321',
  };
  res.send(news);

});
router.get('/news/:newsId/comments',(req,res) =>{
  const comments = [
    {
      id: 11,
      userId:123,
      likes:1,
      text: 'dsafasdf',
      publishedAt: '14/10/12',
    },
    {
      id: 11,
      userId:123,
      likes:1,
      text: 'dsafasdf',
      publishedAt: '14/10/12',
    }
  ];
  res.send(comments);

});
router.get('/news/:newsId/comments/:commentsId',(req,res) =>{
  const comment = {
      id: 11,
      newsId:12,
      userId:123,
      likes:1,
      text: 'dsafasdf',
      publishedAt: '14/10/12',
    };
    res.send(comment);

});


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
router.post('/posts',(req,res) => {
  const json = {
    response: 'New post created successfully!',
    data: {
      id: 4345,
      text: 'Contenido de la publicación',
    },
  };
  res.send(json);
});

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
router.delete('/news/:newsId',(req,res)=>{ });
router.delete('/news/:newsId/comments/:commentsId',(req,res)=>{ });

module.exports = router;
