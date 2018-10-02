
/**
 * middleware para sustituir groserias con un asterisco
 * @param  {object}   err  error
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {Function} next te lleva a la siguiente funcion
 */

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
  next();
};
// exports.bloquearGroserias = (err, req, res, next) => {
//   const groserias = ['pendejo', 'puto', 'idiota', 'maricon', 'cabron'];
//   const texto = req.body.text
//   for (i in groserias) {
//     if (texto.includes(groserias[i])){
//       texto = texto.replace(groserias[i], '*****');
//     }
//   }
//   req.body.text = texto;
//   next();
// };
//
// /**
//  * funcion que revisa que solo haya letras.
//  * @param  {object}   err  error
//  * @param  {object}   req  request
//  * @param  {object}   res  response
//  * @param  {Function} next te lleva a la siguiente funcion
//  */
// exports.validateTeacherName = (err,req,res,next) =>{
//   var nombre = req.body.name;
//   if(nombre.lengt < 40 && /^[a-zA-Z]/.test(nombre)){
//     next();
//   }
//   next(err);
// }
