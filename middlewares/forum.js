
/**
 * middleware para sustituir groserias con un asterisco
 * @param  {object}   err  error
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {Function} next te lleva a la siguiente funcion
 */
const badRequestJSON = {
  status: 400,
  response: 'Bad request',
  message: null,
  data: null,
};

class ForumMid {

  static validateNumberParams(req, res, next) {
    console.log(/^\d+$/.test(req.params.topicId));
    if (req.params.topicId <= 0 || /^\d+$/.test(req.params.topicId)) {
      badRequestJSON.message = 'invalid topic id';
      res.status(400).send(badRequestJSON);
    } else {
      next();
    }
  }

  static validateNumberParamsThread(err, req, res, next) {
    console.log(/^\d+$/.test(req.params.threadId));
    if (req.params.threadId <= 0 || /^\d+$/.test(req.params.threadId)) {
      badRequestJSON.message = 'invalid thread id';
      res.status(400).send(badRequestJSON);
    } else {
      next();
    }
  }

  static validateNumberParamsPost(req, res, next) {
    console.log(/^\d+$/.test(req.params.postId));
    if (req.params.postId <= 0 || /^\d+$/.test(req.params.postId)) {
      badRequestJSON.message = 'invalid post id';
      res.status(400).send(badRequestJSON);
    } else {
      next();
    }
  }
}


exports.bloquearGroserias = (req, res, next) => {
  const groserias = ['pendejo', 'puto', 'idiota', 'maricon','cabron'];
  const texto = req.body.text;
  for (i in groserias) {
    if (texto.includes(groserias[i])) {
      texto = texto.replace(groserias[i],'*****');
    }
  }
  req.body.text = texto;
  next();
};

exports.noNumbers = (req, res, next) => {
  const nombre = req.body.name;
  if (nombre.lengt < 40 && /^[a-zA-Z]/.test(nombre)) {
    next();
  } else {
    res.status(400).send({ error: 'El nombre no cumple con las caracteristicas adecuadas' });
  }
};

exports.noLettersInRoute = (req, res, next) => {
  for (var i in req.body) {
      if (/^\d+$/.test(req.body[i])){
        res.status(400).send({ error: 'Not letters allow in route'});
        }
      next();
      }
};

exports.noEmpty = (req, res, next) => {
  let empty = [];
  for (var i in req.body) {
      if (req.body[i] == null){
        empty.push(req.body[i]);
      }
  }
  if (empty.length > 0) {
    res.status(400).send({ error: 'dejaste un campo vacio' });
  }
};
