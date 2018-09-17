
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
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
app.get('/forum/posts',(req,res) => {
  const posts = [
    {
      id: 111,
      text:'Como se agenda?',
      likes: 1,
      userId: 4575,
      published: 14/10/12
    },
    {
      id: 111,
      text:'Como se agenda?',
      likes: 1,
      userId: 4575,
      publishedAt: 14/10/12
    },
  ];
});
app.get('/forum/posts/:postsId',(req,res) =>{
  const post = {
      id: req.params.postId,
      text:'Como se agenda?',
      likes: 1,
      userId: 4575,
      publishedAt: 14/10/12
  }
});
app.get('/forum/posts/:postsId/comments', (req,res) =>{
  const comments = [
    {
      id: 123,
      text: "No es tu muro prro :v",
      likes: 1,
      postId:123,
      userId: 1233;
      publishedAt: 14/10/12
    },
    {
      id: 123,
      text: "No es tu muro prro :v",
      likes: 1,
      postId:123,
      userId: 1233,
      publishedAt: 14/10/12
    },
  ]
});
app.get('/forum/posts/:postsId/comments/:commentsId', (req,res) =>{
  const comment = {
    id: req.params.commentsId,
    text: "No es tu muro prro :v",
    likes: 1,
    postId:123,
    userId: 1233,
    publishedAt: 14/10/12
  }
});
app.get('/forum/teachers/',(req,res) =>{
  const teachers = [
    {
      id: 123,
      name: "El mugres",
      followers: 10,
      publishedAt: 14/10/12
    },
    {
      id: 123,
      name: "El mugres",
      followers: 10,
      publishedAt: 14/10/12
    },
  ]
});
app.get('/forum/teachers/:teachersId',(req,res) =>{
  const teacher = {
    id: req.params.teachersId,
    positive: 1,
    negative: 2,
    name: "El mugres",
    followers: 10
  }
});
app.get('/forum/teachers/:teachersId/comments',(req,res) =>{
  const comments = [
    {
      id: 123,
      text: "fdsafasdfas",
      teacherId: 111,
      userId: 1213,
      likes: 1,
      publishedAt: 14/10/12
    },
  ]
});
app.get('/forum/teachers/:teachersId/comments/:commentsId',(req,res) =>{
  const comment = {
    id: req.params.commentsId,
    text: "fdsafasdfas",
    userId: 1213,
    teacherId: 111,
    likes: 1,
    publishedAt: 14/10/12
  }
});

app.get('/forum/news',(req,res)  =>{
  const news = [
    {
      id: 11,
      title: "dsafas",
      text: "dsafasdf",
      image: "fsfasdfas.jpg",
      publishedAt: "14/10/12",
      publishedBy: "12321"
    },
    {
      id: 11,
      title: "dsafas",
      text: "dsafasdf",
      image: "fsfasdfas.jpg",
      publishedAt: "14/10/12",
      publishedBy: "12321"
    }
  ]
});
app.get('/forum/news/:newsId',(req,res)  =>{
  const new = {
    id: 11,
    title: "dsafas",
    text: "dsafasdf",
    image: "fsfasdfas.jpg",
    publishedAt: "14/10/12",
    publishedBy: "12321"
  }
});
app.get('/forum/news/:newsId/comments',(req,res) =>{
  const comments = [
    {
      id: 11,
      userId:123,
      likes:1,
      text: "dsafasdf",
      publishedAt: "14/10/12",
    },
    {
      id: 11,
      userId:123,
      likes:1,
      text: "dsafasdf",
      publishedAt: "14/10/12",
    }
  ]
});
app.get('/forum/news/:newsId/comments/:commentsId',(req,res) =>{
  const comment = {
      id: 11,
      newsId:
      userId:123,
      likes:1,
      text: "dsafasdf",
      publishedAt: "14/10/12",
    }
});

/**
 * This are all the GET methods for the forum page.
 * POST /forum/posts
 * POST /forum/posts/:postsId
 * POST /forum/posts/:postsId/comments
 * POST /forum/posts/:postsId/comments/:commentsId

 * POST /forum/teachers
 * POST /forum/teachers/:teachersId
 * POST /forum/teachers/:teachersId/comments
 * POST /forum/teachers/:teachersId/comments/:commentsId

 * POST /forum/news
 * POST /forum/news/:newsId
 * POST /forum/news/:newsId/comments
 * POST /forum/news/:newsId/comments/:commentsId
 */

/**
 * Create a post
 */
app.post('/forum/posts',(req,res) => {});
/**
 * Create a comment on a post
 */
app.post('/forum/posts/:postsId/comments', (req,res) =>{});


/**
 * Create a new teacher
 */
app.post('/forum/teachers/',(req,res) =>{});
/**
 * comment a teacher
 */
app.post('/forum/teachers/:teachersId/comments',(req,res) =>{});
/**
 * Create a news
 */
app.post('/forum/news/',(req,res) =>{});
/**
 * Comment a news
 */
app.post('/forum/news/:newsId/comments',(req,res) =>{});


app.listen(3000, () => console.log('My cute app is running on port 3000!'));
