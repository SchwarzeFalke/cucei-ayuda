/**
 * @Author: root
 * @Date:   2018-09-18T09:45:53-05:00
 * @Last modified by:   root
 * @Last modified time: 2018-09-19T03:13:28-05:00
 */

const { Router } = require('express');

const middleWares = require('../middlewares');

const router = Router();

/**
 The next block code reffers to all GET methods of USERS resource, which
 includes the next resources:
 GET /users
 GET /users/userId
 GET /users/userId/map
 GET /users/userId/routes
 GET /users/userId/schedule
 GET /users/userId/posts
 GET /users/userId/posts/postId
 Block code beggining line: 29
 Block code ending line: 234
*/

/**
 * GET users/
 * @type {Array} Return all users from database
 */
router.get('/', middleWares.addDate, (req, res) => {
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
  const json = {
    response: 'Ok',
    data: users,
    dateData: req.body,
    total: 2,
  };
  res.send(json);
});

/**
 * GET users/userId
 * @type {Object} Returns a specific user through its identifier
 */
router.get('/:userId', (req, res) => {
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
router.get('/:userId/map', (req, res) => {
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
router.get('/:userId/routes', (req, res) => {
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
router.get('/:userId/schedule', (req, res) => {
  const userSchedule = {
    scheduleId: `432${req.params.userId}3`,
  };
  res.send(userSchedule);
});

/**
 * GET users/userId/posts
 * @type {Array} Returns all publications by the given user
 */
router.get('/:userId/posts', (req, res) => {
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
router.get('/:userId/posts/:postId', (req, res) => {
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
router.post('/', (req, res) => {
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
router.post('/:userId/schedule', (req, res) => {
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
router.post('/:userId/posts', (req, res) => {
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

module.exports = router;
