
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

});
app.get('/forum/posts/:postsId',(req,res) =>{});
app.get('/forum/posts/:postsId/comments', (req,res) =>{});
app.get('/forum/posts/:postsId/comments/:commentsId', (req,res) =>{});

app.get('/forum/teachers/',(req,res) =>{});
app.get('/forum/teachers/:teachersId',(req,res) =>{});
app.get('/forum/teachers/:teachersId/comments',(req,res) =>{});
app.get('/forum/teachers/:teachersId/comments/:commentsId',(req,res) =>{});

app.get('/forum/news/',(req,res)  =>{});
app.get('/forum/news/:newsId',(req,res)  =>{});
app.get('/forum/news/:newsId/comments',(req,res) =>{});
app.get('/forum/news/:newsId/comments/:commentsId',(req,res) =>{});

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
 * Create a new comment
 */
app.post('/forum/teachers/:teachersId/comments',(req,res) =>{});

app.post('/forum/news/',(req,res) =>{});

app.post('/forum/news/:newsId/comments',(req,res) =>{});


// app.get('/users', (req, res) => {
//   const users = [
//     {
//       'id': 1,
//       'name': 'Carlos',
//       'middle-name': 'Adonis',
//       'last-name':  'Vara'
//     },
//     {
//       'id': 5,
//       'name': 'Carlos',
//       'middle-name': 'Adonis',
//       'last-name':  'Vara'
//     },
//     {
//       'id': 3,
//       'name': 'Carlos',
//       'middle-name': 'Adonis',
//       'last-name':  'Vara'
//     },
//   ]
//   res.send(users);
// });
//
// app.get('/users/userId', (req, res) => {
//   const user = {
//     'id': req.params.userId,
//     'name': 'Carlos'
//   }
//   res.send(user);
// });

app.listen(3000, () => console.log('My cute app is running on port 3000!'));
