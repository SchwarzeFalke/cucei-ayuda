// middleware class for schedule error handling

class scheduleM {
  static validateNrc(req, res, next) {
    try {
      console.log(req.params);
      next();
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = scheduleM;
