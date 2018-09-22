
exports.addDate = (req, res, next) => {
  req.body.date = Date.now();
  next();
};

exports.checkEdif = (req, res, next) => {
  if (String(req.body.edif).indexOf('DED') < 0) {
    return;
  } else {
    next();
  }
};
