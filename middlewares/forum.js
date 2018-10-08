
const badRequestJSON = {
  status: 400,
  response: 'Bad request',
  message: null,
  data: null,
};

class ForumMid {
  static validateNumberParams(req, res, next) {
    if (req.params.topicId <= 0 || !(/^\d+$/.test(req.params.topicId))) {
      badRequestJSON.message = 'invalid topic id';
      res.status(400).send(badRequestJSON);
    } else {
      next();
    }
  }

  static validateNumberParamsThread(err, req, res, next) {
    if (req.params.threadId <= 0 || !(/^\d+$/.test(req.params.threadId))) {
      badRequestJSON.message = 'invalid thread id';
      res.status(400).send(badRequestJSON);
    } else {
      next();
    }
  }

  static validateNumberParamsPost(req, res, next) {
    if (req.params.postId <= 0 || !(/^\d+$/.test(req.params.postId))) {
      badRequestJSON.message = 'invalid post id';
      res.status(400).send(badRequestJSON);
    } else {
      next();
    }
  }

  static noEmptyPost(req, res, next) {
    const empty = [];
    const key = Object.keys(req.body);
    const params = Object.values(req.body);
    if (key.includes('name') &&
    key.includes('descript') && key.includes('exist')) {
      if (req.body.exist !== 1 || req.body.exist !== 0 ||
        req.body.exist !== true || req.body.exist !== false) {

        }
    }
    for (var i in req.body){
      if (key[i] === 'name' && req.body[i] === '') {
        console.log('name is empty');
      }
      if (key[i] === 'descript' && req.body[i] === '') {
        console.log('descript is empty');
      }
      if (key[i] === 'exist' && req.body[i] === '') {
        console.log('exist is empty');

      }

      console.log(req.body[i]);
    }
    if (empty.length > 0) {
      res.status(400).send({ error: 'dejaste un campo vacio' });
    } else {
      res.status(400).send({ error: 'dejaste un campo vacio' });
      // next();
    }
  }

  static noEmptySearch(req, res, next) {
    console.log(req.query);
    try {
      if (req.query) {
        if (req.query.count) {
          if (req.query.count <= 0 || !(/^\d+$/.test(req.query.count))) {
            res.status(400).send({ error: 'Letters not allow and numbers equal or below 0' });
          }
        }
        if (req.query.page) {
          if (req.query.page <= 0 || !(/^\d+$/.test(req.query.page))) {
            res.status(400).send({ error: 'Letters not allow and numbers equal or below 0' });
          }
        }
        if (req.query.sort) {
          if (req.query.sort !== 'ASC' || req.query.sort !== 'DESC') {
            res.status(400).send({ error: 'We just accept DESC or ASC' });
          }
        }
      } else {
        next();
      }
    } catch (e) {
      console.log(`Error grave !!!!!! = ${e}`);
    }
  }
}


// exports.bloquearGroserias = (req, res, next) => {
//   const groserias = ['pendejo', 'puto', 'idiota', 'maricon','cabron'];
//   const texto = req.body.text;
//   for (i in groserias) {
//     if (texto.includes(groserias[i])) {
//       texto = texto.replace(groserias[i],'*****');
//     }
//   }
//   req.body.text = texto;
//   next();
// };
//
// exports.noNumbers = (req, res, next) => {
//   const nombre = req.body.name;
//   if (nombre.lengt < 40 && /^[a-zA-Z]/.test(nombre)) {
//     next();
//   } else {
//     res.status(400).send({ error: 'El nombre no cumple con las caracteristicas adecuadas' });
//   }
// };
//
// exports.noLettersInRoute = (req, res, next) => {
//   for (var i in req.body) {
//       if (/^\d+$/.test(req.body[i])){
//         res.status(400).send({ error: 'Not letters allow in route'});
//         }
//       next();
//       }
// };

module.exports = ForumMid;
