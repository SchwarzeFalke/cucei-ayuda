/**
 * @Author: schwarze_falke
 * @Date:   2018-09-13T13:50:03-05:00
 * @Last modified by:   root
 * @Last modified time: 2018-09-19T02:41:31-05:00
*/
const express = require('express');

const app = express();
const router = require('./routes');


app.use(router);

// /**
//  * These are all the GET methods for the schedules.
//  * GET /schedule
//  * GET /schedule/:scheduleId
//  * GET /schedule/:scheduleId/subjects
//  */
//
// // GET /schedule  Returns all schedules
// app.get('/schedule', (req, res) => {
//   const schedules = [
//     [
//       {
//         Id: 1212,
//         Clave: 17607,
//         Materia: 'Estructuras de Datos',
//         Sec: 'D01',
//         CR: 8,
//         Hora: '1100-1255',
//         Dias: 'L-M',
//         Edif: 'DEDT',
//         Aula: 'A014',
//         Profesor: 'Jose',
//       },
//       {
//         Id: 1262,
//         Clave: 17609,
//         Materia: 'Algoritimia',
//         Sec: 'D05',
//         CR: 8,
//         Hora: '1100-1255',
//         Dias: 'M-J',
//         Edif: 'DEDX',
//         Aula: 'A014',
//         Profesor: 'Jose',
//       },
//     ],
//   ];
//   res.send(schedules);
// });
//
// // GET /schedule/:scheduleId    returns specific schedule
// app.get('/schedule/:scheduleId', (req, res) => {
//   const schedule = {
//     scheduleId: req.params.scheduleId,
//     schedule: [
//       {
//         Id: 1212,
//         Clave: 17607,
//         Materia: 'Estructuras de Datos',
//         Sec: 'D01',
//         CR: 8,
//         Hora: '1100-1255',
//         Dias: 'L-M',
//         Edif: 'DEDT',
//         Aula: 'A014',
//         Profesor: 'Jose',
//       },
//       {
//         Id: 1262,
//         Clave: 17609,
//         Materia: 'Algoritimia',
//         Sec: 'D05',
//         CR: 8,
//         Hora: '1100-1255',
//         Dias: 'M-J',
//         Edif: 'DEDX',
//         Aula: 'A014',
//         Profesor: 'Jose',
//       },
//     ],
//   };
//   res.send(schedule);
// });
//
// // GET /schedule/:scheduleId/subjects
// // Returns all subjects of a method
// app.get('/schedule/:scheduleId/subjects', (req, res) => {
//   const subjects = {
//     id: req.params.scheduleId,
//     subjects: [
//       {
//         Materia: 'Algoritmia',
//         Hora: '1100-1255',
//         Dias: 'M-J',
//         Edif: 'DEDX',
//         Aula: 'A014',
//       },
//       {
//         Materia: 'Bases de Datos',
//         Hora: '1100-1255',
//         Dias: 'L-M',
//         Edif: 'DEDX',
//         Aula: 'A019',
//       },
//     ],
//   };
//   res.send(subjects);
// });
//
// // POST /schedule
// app.post('/schedule', (req, res) => {
//   const schedule = [
//     {
//       Id: req.body.id1,
//       Clave: req.body.clave1,
//       Materia: req.body.materia1,
//       Sec: req.body.sec1,
//       CR: req.body.cr1,
//       Hora: req.body.hora1,
//       Dias: req.body.dias1,
//       Edif: req.body.edif1,
//       Aula: req.body.aula1,
//       Profesor: req.body.profesor1,
//     },
//     {
//       Id: req.body.id2,
//       Clave: req.body.clave2,
//       Materia: req.body.materia2,
//       Sec: req.body.sec2,
//       CR: req.body.cr2,
//       Hora: req.body.hora2,
//       Dias: req.body.dias2,
//       Edif: req.body.edif2,
//       Aula: req.body.aula3,
//       Profesor: req.body.profesor2,
//     },
//   ];
//   res.send(schedule);
// });
//
// // PUT /schedule/:scheduleId
// app.put('/schedule/:scheduleId', (req, res) => {
//   const schedule = {
//     scheduleId: req.params.scheduleId,
//     schedule: [
//       {
//         Id: req.body.id1,
//         Clave: req.body.clave1,
//         Materia: req.body.materia1,
//         Sec: req.body.sec1,
//         CR: req.body.cr1,
//         Hora: req.body.hora1,
//         Dias: req.body.dias1,
//         Edif: req.body.edif1,
//         Aula: req.body.aula1,
//         Profesor: req.body.profesor1,
//       },
//       {
//         Id: req.body.id2,
//         Clave: req.body.clave2,
//         Materia: req.body.materia2,
//         Sec: req.body.sec2,
//         CR: req.body.cr2,
//         Hora: req.body.hora2,
//         Dias: req.body.dias2,
//         Edif: req.body.edif2,
//         Aula: req.body.aula3,
//         Profesor: req.body.profesor2,
//       },
//     ],
//   };
//   res.send(schedule);
// });
//
// // DELETE /schedule/:scheduleId
// app.delete('/schedule/:scheduleId', (req, res) => {
//   res.send(req.params.scheduleId);
// });
//
// /**
//
//  * This are all the GET methods for the forum page.
//  * GET /forum/posts
//  * GET /forum/posts/:postsId
//  * GET /forum/posts/:postsId/comments
//  * GET /forum/posts/:postsId/comments/:commentsId
//
//  * GET /forum/teachers
//  * GET /forum/teachers/:teachersId
//  * GET /forum/teachers/:teachersId/comments
//  * GET /forum/teachers/:teachersId/comments/:commentsId
//
//  * GET /forum/news
//  * GET /forum/news/:newsId
//  * GET /forum/news/:newsId/comments
//  * GET /forum/news/:newsId/comments/:commentsId
//
//  */
// app.get('/forum/posts',(req,res) => {
//   const posts = [
//     {
//       id: 111,
//       text:'Como se agenda?',
//       likes: 1,
//       userId: 4575,
//       published: 14/10/12
//     },
//     {
//       id: 111,
//       text:'Como se agenda?',
//       likes: 1,
//       userId: 4575,
//       publishedAt: 14/10/12
//     },
//   ];
// });
// app.get('/forum/posts/:postsId',(req,res) =>{
//   const post = {
//       id: req.params.postId,
//       text:'Como se agenda?',
//       likes: 1,
//       userId: 4575,
//       publishedAt: 14/10/12
//   }
// });
// app.get('/forum/posts/:postsId/comments', (req,res) =>{
//   const comments = [
//     {
//       id: 123,
//       text: "No es tu muro prro :v",
//       likes: 1,
//       postId:123,
//       userId: 1233,
//       publishedAt: 14/10/12
//     },
//     {
//       id: 123,
//       text: "No es tu muro prro :v",
//       likes: 1,
//       postId:123,
//       userId: 1233,
//       publishedAt: 14/10/12
//     },
//   ]
// });
// app.get('/forum/posts/:postsId/comments/:commentsId', (req,res) =>{
//   const comment = {
//     id: req.params.commentsId,
//     text: "No es tu muro prro :v",
//     likes: 1,
//     postId:123,
//     userId: 1233,
//     publishedAt: 14/10/12
//   }
// });
// app.get('/forum/teachers/',(req,res) =>{
//   const teachers = [
//     {
//       id: 123,
//       name: "El mugres",
//       subject: "algoritmia",
//       department: "ingenieria",
//       positive: 1,
//       negative: 2,
//       publishedAt: 14/10/12
//     },
//     {
//       id: 123,
//       name: "El mugres",
//       subject: "algoritmia",
//       department: "ingenieria",
//       positive: 1,
//       negative: 2,
//       publishedAt: 14/10/12
//     },
//   ]
// });
// app.get('/forum/teachers/:teachersId',(req,res) =>{
//   const teacher = {
//     id: req.params.teachersId,
//     positive: 1,
//     negative: 2,
//     name: "El mugres",
//     subject: "algoritmia",
//     department: "ingenieria"
//     followers: 10
//   }
// });
// app.get('/forum/teachers/:teachersId/comments',(req,res) =>{
//   const comments = [
//     {
//       id: 123,
//       text: "fdsafasdfas",
//       teacherId: 111,
//       userId: 1213,
//       likes: 1,
//       publishedAt: 14/10/12
//     },
//   ]
// });
// app.get('/forum/teachers/:teachersId/comments/:commentsId',(req,res) =>{
//   const comment = {
//     id: req.params.commentsId,
//     text: "fdsafasdfas",
//     userId: 1213,
//     teacherId: 111,
//     likes: 1,
//     publishedAt: 14/10/12
//   }
// });
//
// app.get('/forum/news',(req,res)  =>{
//   const news = [
//     {
//       id: 11,
//       title: "dsafas",
//       text: "dsafasdf",
//       image: "fsfasdfas.jpg",
//       publishedAt: "14/10/12",
//       publishedBy: "12321"
//     },
//     {
//       id: 11,
//       title: "dsafas",
//       text: "dsafasdf",
//       image: "fsfasdfas.jpg",
//       publishedAt: "14/10/12",
//       publishedBy: "12321"
//     }
//   ]
// });
// app.get('/forum/news/:newsId',(req,res)  =>{
//   const new = {
//     id: 11,
//     title: "dsafas",
//     text: "dsafasdf",
//     image: "fsfasdfas.jpg",
//     publishedAt: "14/10/12",
//     publishedBy: "12321"
//   }
// });
// app.get('/forum/news/:newsId/comments',(req,res) =>{
//   const comments = [
//     {
//       id: 11,
//       userId:123,
//       likes:1,
//       text: "dsafasdf",
//       publishedAt: "14/10/12",
//     },
//     {
//       id: 11,
//       userId:123,
//       likes:1,
//       text: "dsafasdf",
//       publishedAt: "14/10/12",
//     }
//   ]
// });
// app.get('/forum/news/:newsId/comments/:commentsId',(req,res) =>{
//   const comment = {
//       id: 11,
//       newsId:
//       userId:123,
//       likes:1,
//       text: "dsafasdf",
//       publishedAt: "14/10/12",
//     }
// });
//
//
// /**
//  * This are all the POST methods for the forum page.
//
//  * POST /forum/posts
//  * POST /forum/posts/:postsId/comments
//
//  * POST /forum/teachers
//  * POST /forum/teachers/:teachersId/comments
//
//  * POST /forum/news
//  * POST /forum/news/:newsId/comments
//  */
//
// /**
//  * Create a post
//  */
// app.post('/forum/posts',(req,res) => {
//   const json = {
//     response: 'New post created successfully!',
//     data: {
//       id: 4345,
//       text: 'Contenido de la publicación',
//     },
//   };
// });
//
// /**
//  * Create a comment on a post
//  */
// app.post('/forum/posts/:postsId/comments', (req,res) =>{
//   const json = {
//     response: 'New comment created successfully!',
//     data: {
//       id: 4345,
//       text: 'Contenido de la publicación',
//     },
//   };
// });
//
// /**
//  * Create a new teacher
//  */
// app.post('/forum/teachers',(req,res) =>{
//   const json = {
//     response: 'New teacher created successfully!',
//     data: {
//       id: 4345,
//       subject: "algoritmia",
//       department: "ingenieria"
//       name: 'fdsaf',
//     },
//   };
// });
//
// /**
//  * comment a teacher
//  */
// app.post('/forum/teachers/:teachersId/comments',(req,res) =>{
//   const json = {
//     response: 'New comment created successfully!',
//     data: {
//       id: 4345,
//       text: 'Contenido de la publicación',
//     },
//   };
// });
//
// /**
//  * Create a news
//  */
// app.post('/forum/news/',(req,res) =>{
//   const json = {
//     response: 'News created successfully!',
//     data: {
//       id: 4345,
//       text: 'Contenido de la publicación',
//     },
//   };
// });
// /**
//  * Comment a news
//  */
// app.post('/forum/news/:newsId/comments',(req,res) =>{
//   const json = {
//     response: 'New comment created successfully!',
//     data: {
//       id: 4345,
//       text: 'Contenido de la publicación',
//     },
//   };
// });
// /**
//  * This are all the PUT methods for the forum page.
//
//  * PUT /forum/posts
//  * PUT /forum/posts/:postsId/comments
//
//  * PUT /forum/teachers
//  * PUT /forum/teachers/:teachersId/comments
//
//  * PUT /forum/news
//  * PUT /forum/news/:newsId/comments
//  */
//
// app.put('/forum/posts',(req,res) => {
//   const json = {
//     response: 'New post created successfully!',
//     data: {
//       id: 4345,
//       text: 'modificado',
//       modifiedAt: 14/12/18
//     },
//   };
// });
//
// app.put('/forum/posts/:postsId/comments', (req,res) =>{
//   const json = {
//     response: 'New comment created successfully!',
//     data: {
//       id: 4345,
//       text: 'modificado',
//       modifiedAt: 14/12/18
//     },
//   };
// });
//
// /**
//  * Create a new teacher
//  */
// app.put('/forum/teachers',(req,res) =>{
//   const json = {
//     response: 'New teacher created successfully!',
//     data: {
//       id: 4345,
//       name: 'new name',
//       subject: "algoritmia",
//       department: "ingenieria",
//       modifiedAt: 14/12/18
//     },
//   };
// });
//
// /**
//  * comment a teacher
//  */
// app.put('/forum/teachers/:teachersId/comments',(req,res) =>{
//   const json = {
//     response: 'Modified successfully!',
//     data: {
//       id: 4345,
//       text: 'Contenido de la publicación modificado',
//       modifiedAt: 14/12/18
//     },
//   };
// });
//
// /**
//  * Create a news
//  */
// app.put('/forum/news/',(req,res) =>{
//   const json = {
//     response: 'modified successfully!',
//     data: {
//       id: 4345,
//       text: 'Contenido de la publicación modificado',
//       modifiedAt: 14/12/18
//     },
//   };
// });
//
// app.put('/forum/news/:newsId/comments',(req,res) =>{
//   const json = {
//     response: 'modified successfully!',
//     data: {
//       id: 4345,
//       text: 'Coenido modificado',
//       modifiedAt: 14/12/18
//     }
//   };
// });
//
// app.delete('/forum/posts/:postsId', (req,res) =>{});
// app.delete('/forum/posts/:postsId/comments/:commentsId', (req,res) =>{});
// app.delete('/forum/teachers/:teachersId',(req,res)=>{ });
// app.delete('/forum/teachers/:teachersId/comments/:commentsId',(req,res)=>{ });
// app.delete('/forum/news/:newsId',(req,res)=>{ });
// app.delete('/forum/news/:newsId/comments/:commentsId',(req,res)=>{ });

app.listen(3000, () => console.log('My cute app is running on port 3000!'));
