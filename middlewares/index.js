
/**
 * middleware para sustituir groserias con un asterisco
 * @param  {object}   err  error
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {Function} next te lleva a la siguiente funcion
 */
exports.bloquearGroserias = (err, req, res, next) => {
  var groserias = ['pendejo','puto','idiota','maricon','cabron'];
  var texto = req.body.text
  for(i in groserias){
    if(texto.includes(groserias[i])){
      texto = texto.replace(groserias[i],'*****');
    }
  }
  req.body.text = texto;
  next();
}

/**
 * funcion que revisa que solo haya letras.
 * @param  {object}   err  error
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {Function} next te lleva a la siguiente funcion
 */
exports.validateTeacherName = (err,req,res,next) =>{
  var nombre = req.body.name;
  if(nombre.lengt < 40 && /^[a-zA-Z]/.test(nombre)){
    next();
  }
  next(err);
}
