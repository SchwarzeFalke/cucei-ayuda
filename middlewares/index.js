/**
 * @Author: root
 * @Date:   2018-09-18T09:46:16-05:00
 * @Last modified by:   root
 * @Last modified time: 2018-09-19T03:15:13-05:00
 */


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
