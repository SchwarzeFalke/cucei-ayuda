
exports.bloquearGroserias = (err, req, res, next) => {
  var groserias = ['pendejo','puto','idiota','maricon','cabron'];
  var texto = req.body.text
  for(i in groserias){
    if(texto.includes(groserias[i])){
      texto = texto.replace(groserias[i],'*****');
    }
  }
  req.body.text = texto;
}

exports.validate =
