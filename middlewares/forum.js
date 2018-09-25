/**
 * @Author: schwarze_falke
 * @Date:   2018-09-23T13:50:36-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-24T12:33:08-05:00
 */


/**
 * middleware para sustituir groserias con un asterisco
 * @param  {object}   err  error
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {Function} next te lleva a la siguiente funcion
 */
exports.bloquearGroserias = (err, req, res, next) => {
  const groserias = ['pendejo', 'puto', 'idiota', 'maricon', 'cabron'];
  const texto = req.body.text;
  for (i in groserias) {
    if (texto.includes(groserias[i])){
      texto = texto.replace(groserias[i], '*****');
    }
  }
  req.body.text = texto;
  next();
};

/**
 * funcion que revisa que solo haya letras.
 * @param  {object}   err  error
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {Function} next te lleva a la siguiente funcion
 */
exports.validateTeacherName = (err, req, res, next) => {
  const nombre = req.body.name;
  if (nombre.lengt < 40 && /^[a-zA-Z]/.test(nombre)) {
    next();
  }
  next(err);
};
