/**
 * @Author: schwarze_falke
 * @Date:   2018-09-13T13:50:03-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-15T20:32:07-05:00
 */

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * These are all the GET methods for the schedules.
 * GET /schedule
 * GET /schedule/:scheduleId
 * GET /schedule/:scheduleId/subjects
 */

// GET /schedule  Returns all schedules
app.get('/schedule', (req, res) => {
  const schedules = [
    [
      {
        Id: 1212,
        Clave: 17607,
        Materia: 'Estructuras de Datos',
        Sec: 'D01',
        CR: 8,
        Hora: '1100-1255',
        Dias: 'L-M',
        Edif: 'DEDT',
        Aula: 'A014',
        Profesor: 'Jose',
      },
      {
        Id: 1262,
        Clave: 17609,
        Materia: 'Algoritimia',
        Sec: 'D05',
        CR: 8,
        Hora: '1100-1255',
        Dias: 'M-J',
        Edif: 'DEDX',
        Aula: 'A014',
        Profesor: 'Jose',
      },
    ],
  ];
  res.send(schedules);
});

// GET /schedule/:scheduleId    returns specific schedule
app.get('/schedule/:scheduleId', (req, res) => {
  const schedule = {
    scheduleId: req.params.scheduleId,
    schedule: [
      {
        Id: 1212,
        Clave: 17607,
        Materia: 'Estructuras de Datos',
        Sec: 'D01',
        CR: 8,
        Hora: '1100-1255',
        Dias: 'L-M',
        Edif: 'DEDT',
        Aula: 'A014',
        Profesor: 'Jose',
      },
      {
        Id: 1262,
        Clave: 17609,
        Materia: 'Algoritimia',
        Sec: 'D05',
        CR: 8,
        Hora: '1100-1255',
        Dias: 'M-J',
        Edif: 'DEDX',
        Aula: 'A014',
        Profesor: 'Jose',
      },
    ],
  };
  res.send(schedule);
});

// GET /schedule/:scheduleId/subjects
// Returns all subjects of a method
app.get('/schedule/:scheduleId/subjects', (req, res) => {
  const subjects = {
    id: req.params.scheduleId,
    subjects: [
      {
        Materia: 'Algoritmia',
        Hora: '1100-1255',
        Dias: 'M-J',
        Edif: 'DEDX',
        Aula: 'A014',
      },
      {
        Materia: 'Bases de Datos',
        Hora: '1100-1255',
        Dias: 'L-M',
        Edif: 'DEDX',
        Aula: 'A019',
      },
    ],
  };
  res.send(subjects);
});

// POST /schedule
app.post('/schedule', (req, res) => {
  const schedule = [
    {
      Id: req.body.id1,
      Clave: req.body.clave1,
      Materia: req.body.materia1,
      Sec: req.body.sec1,
      CR: req.body.cr1,
      Hora: req.body.hora1,
      Dias: req.body.dias1,
      Edif: req.body.edif1,
      Aula: req.body.aula1,
      Profesor: req.body.profesor1,
    },
    {
      Id: req.body.id2,
      Clave: req.body.clave2,
      Materia: req.body.materia2,
      Sec: req.body.sec2,
      CR: req.body.cr2,
      Hora: req.body.hora2,
      Dias: req.body.dias2,
      Edif: req.body.edif2,
      Aula: req.body.aula3,
      Profesor: req.body.profesor2,
    },
  ];
  res.send(schedule);
});

// PUT /schedule/:scheduleId
app.put('/schedule/:scheduleId', (req, res) => {
  const schedule = {
    scheduleId: req.params.scheduleId,
    schedule: [
      {
        Id: req.body.id1,
        Clave: req.body.clave1,
        Materia: req.body.materia1,
        Sec: req.body.sec1,
        CR: req.body.cr1,
        Hora: req.body.hora1,
        Dias: req.body.dias1,
        Edif: req.body.edif1,
        Aula: req.body.aula1,
        Profesor: req.body.profesor1,
      },
      {
        Id: req.body.id2,
        Clave: req.body.clave2,
        Materia: req.body.materia2,
        Sec: req.body.sec2,
        CR: req.body.cr2,
        Hora: req.body.hora2,
        Dias: req.body.dias2,
        Edif: req.body.edif2,
        Aula: req.body.aula3,
        Profesor: req.body.profesor2,
      },
    ],
  };
  res.send(schedule);
});

// DELETE /schedule/:scheduleId
app.delete('/schedule/:scheduleId', (req, res) => {
  res.send(req.params.scheduleId);
});

//*
 * The next block code reffers to all GET methods of USERS resource, which
 * includes the next resources:
 * GET /users
 * GET /users/userId
 * GET /users/userId/map
 * GET /users/userId/routes
 * GET /users/userId/schedule
 * GET /users/userId/posts
 * GET /users/userId/posts/postId
 * Block code beggining line: 29
 * Block code ending line: 234
 */

/**
 * GET users/
 * @type {Array} Return all users from database
 */
app.get('/users', (req, res) => {
  const users = [
    {
      id: 1,
      name: 'Carlos',
      middleName: 'Adonis',
      lastName: 'Vara',
      email: 'autor.cvp303@gmail.com',
    },
    {
      id: 2,
      name: 'Joaquin',
      middleName: 'Loera',
      lastName: 'Santos',
      email: 'san_lojo@gmail.com',
    },
    {
      id: 3,
      name: 'Ana',
      middleName: 'Jimena',
      lastName: 'Sánchez',
      email: 'jimimi@hotmail.com',
    },
    {
      id: 4,
      name: 'Karla',
      middleName: 'Rocío',
      lastName: 'Saenz',
      email: 'le_kasaz@gmail.com',
    },
    {
      id: 5,
      name: 'Felipe',
      middleName: 'Gerardo',
      lastName: 'Pérez',
      email: 'gusi_guz03@gmail.com',
    },
    {
      id: 6,
      name: 'Angela',
      middleName: 'Cecilia',
      lastName: 'Fernández',
      email: 'ccff_angi@outlook.com',
    },
    {
      id: 7,
      name: 'Gustavo',
      middleName: 'Enrique',
      lastName: 'Giménez',
      email: 'chaco4567@gmail.com',
    },
  ];
  res.send(users);
});

/**
 * GET users/userId
 * @type {Object} Returns a specific user through its identifier
 */
app.get('/users/:userId', (req, res) => {
  const user = {
    id: req.params.userId,
    name: `UsuarioNombre${req.params.userId}`,
    middlname: `UsuarioSegNombre${req.params.userId}`,
    lastname: `UsuarioApellido${req.params.userId}`,
    email: `usuario${req.params.userId}@correo.com.mx`,
  };
  res.send(user);
});

/**
 * GET users/userId/map
 * @type {Object} Returns the identifier of an specific user's map
 */
app.get('/users/:userId/map', (req, res) => {
  const userMap = {
    id: req.params.userId,
    name: `UsuarioNombreCompleto${req.params.userId}`,
    mapId: `1234${req.params.userId}`,
  };
  res.send(userMap);
});

/**
 * GET users/userId/routes
 * @type {Array} Returns all routes from a specific user through its identifier
 * "start" and "end" attributes reffers to a starting point and an ending point
 */
app.get('/users/:userId/routes', (req, res) => {
  const routes = [
    {
      routeId: `346${req.params.userId}4`,
      buildingStart: 'X',
      buildingEnd: 'BETA',
      floorStart: 2,
      floorEnd: 3,
      classroomStart: 8,
      classroomEnd: 15,
    },
    {
      routeId: `346${req.params.userId}4`,
      buildingStart: 'V2',
      buildingEnd: 'X',
      floorStart: 1,
      floorEnd: 3,
      classroomStart: 3,
      classroomEnd: 21,
    },
    {
      routeId: `346${req.params.userId}4`,
      buildingStart: 'BETA',
      buildingEnd: 'T',
      floorStart: 1,
      floorEnd: 2,
      classroomStart: 2,
      classroomEnd: 8,
    },
    {
      routeId: `346${req.params.userId}4`,
      buildingStart: 'X',
      buildingEnd: 'V2',
      floorStart: 1,
      floorEnd: 1,
      classroomStart: 2,
      classroomEnd: 3,
    },
    {
      routeId: `346${req.params.userId}4`,
      buildingStart: 'ALPHA',
      buildingEnd: 'X',
      floorStart: 3,
      floorEnd: 1,
      classroomStart: 14,
      classroomEnd: 5,
    },
  ];
  res.send(routes);
});

/**
 * GET users/userId/schedule
 * @type {Object} Returns the schedule's identifier from an specific user
 */
app.get('/users/:userId/schedule', (req, res) => {
  const userSchedule = {
    scheduleId: `432${req.params.userId}3`,
  };
  res.send(userSchedule);
});

/**
 * GET users/userId/posts
 * @type {Array} Returns all publications by the given user
 */
app.get('/users/:userId/posts', (req, res) => {
  const userPosts = [
    {
      postId: `64${req.params.userId}2`,
      forumThreadId: 4,
      content: 'Contenido de la publicación',
    },
    {
      postId: `64${req.params.userId}2`,
      forumThreadId: 5,
      content: 'Contenido de la publicación',
    },
    {
      postId: `64${req.params.userId}2`,
      forumThreadId: 1,
      content: 'Contenido de la publicación',
    },
    {
      postId: `64${req.params.userId}2`,
      forumThreadId: 3,
      content: 'Contenido de la publicación',
    },
    {
      postId: `64${req.params.userId}2`,
      forumThreadId: 4,
      content: 'Contenido de la publicación',
    },
    {
      postId: `64${req.params.userId}2`,
      forumThreadId: 2,
      content: 'Contenido de la publicación',
    },
  ];
  res.send(userPosts);
});

/**
 * GET users/:userId/posts/:postId
 * @type {Object} Returns a specific post from a specific user
 */
app.get('/users/:userId/posts/:postId', (req, res) => {
  const specificPost = {
    postId: `${req.params.postId}${req.params.userId}`,
    forumThreadId: 3,
    content: 'Contenido de la publicación',
  };
  res.send(specificPost);
});

/**
 * The next block code reffers to all POST methods of USERS resource, which
 * includes the next resources:
 * POST /users
 * POST /users/userId/schedule
 * POST /users/userId/posts
 * Block code beggining line: 247
 * Block code ending line: 234
 */

/**
 * POST /users
 * @type {Object} Create a new user by given name, middle name, last name, email
 * and a password. Returns an ok response.
 */
app.post('/users', (req, res) => {
  const json = {
    response: 'New user created successfully!',
    data: {
      id: 982,
      name: req.body.name,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    },
  };
  res.send(json);
});

/**
 * POST /users/userId/schedule
 * @type {Object} Creates a new schedule for a given user ID.
 * It takes in only the ID of the subjects.
 */
app.post('/users/:userId/schedule', (req, res) => {
  const json = {
    response: 'New schedule assigned successfully!',
    data: {
      scheduleId: 837,
      subjects: {
        1: req.body.subjects[1],
        2: req.body.subjects[2],
        3: req.body.subjects[3],
        4: req.body.subjects[4],
        5: req.body.subjects[5],
        6: req.body.subjects[6],
      },
    },
  };
  res.send(json);
});

/**
 * POST /users/userId/posts
 * @type {Object} Creates a new post of a given user.
 */
app.post('/users/:userId/posts', (req, res) => {
  const json = {
    response: 'New post created successfully!',
    data: {
      postId: 4345,
      forumThreadId: 3,
      content: 'Contenido de la publicación',
    },
  };
  res.send(json);
});

app.listen(3000, () => console.log('My cute app is running on port 3000!'));
