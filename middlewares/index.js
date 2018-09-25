/**
 * @Author: root
 * @Date:   2018-09-18T09:46:16-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-09-25T00:32:16-05:00
 */
const db = require('../db');

exports.validateId = (req, res, next) => {
  if (req.route.path === '/:userId') {
    db.validate('users', 'stud_code', req.params.userId).then((results) => {
      if (results) {
        console.log('Exists!');
      } else {
        console.log('Error!');
      }
    });
  }
  next();
};

exports.addDate = (req, res, next) => {
  req.body.date = Date.now();
  next();
};
