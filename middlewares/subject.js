/**
 * @Author: schwarze_falke
 * @Date:   2018-10-07T20:34:12-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-07T22:54:49-05:00
 */

// middleware class for subject error handling

const forbiddenJSON = {
  status: 403,
  response: 'Forbidden',
  message: null,
  data: null,
};


class subjectM {
  static validateNrc(req, res, next) {
    const test = /^\d+$/;
    try {
      if (req.body.nrc === undefined) {
        forbiddenJSON.message = 'Invalid Nrc';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
      if (test.test(req.body.nrc)) {
        if (Number(req.body.nrc) < 1) {
          forbiddenJSON.message = 'Invalid Nrc';
          res.status(forbiddenJSON.status).send(forbiddenJSON);
        } else {
          next();
        }
      } else {
        forbiddenJSON.message = 'Invalid Nrc';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static validateName(req, res, next) {
    const test = /^[A-Za-z]+$/;
    try {
      if (req.body.name === undefined) {
        forbiddenJSON.message = 'Invalid Name';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
      if (test.test(req.body.name)) {
        next();
      } else {
        forbiddenJSON.message = 'Invalid Name';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static validateFirstDay(req, res, next) {
    const test = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    try {
      if (req.body.first_day === undefined) {
        forbiddenJSON.message = 'Invalid first_day';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
      if (test.test(req.body.first_day)) {
        next();
      } else {
        forbiddenJSON.message = 'Invalid first_day';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static validateSecDay(req, res, next) {
    const test = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    try {
      if (req.body.sec_day === undefined) {
        forbiddenJSON.message = 'Invalid sec_day';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
      if (test.test(req.body.sec_day)) {
        const fday = new Date(req.body.first_day);
        const sday = new Date(req.body.sec_day);
        if (fday >= sday) {
          forbiddenJSON.message = 'Invalid dates';
          res.status(forbiddenJSON.status).send(forbiddenJSON);
        } else {
          next();
        }
      } else {
        forbiddenJSON.message = 'Invalid sec_day';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static validateClass(req, res, next) {
    const test = /^\d+$/;
    try {
      if (req.body.classroom === undefined) {
        forbiddenJSON.message = 'Invalid Classroom';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
      if (test.test(req.body.classroom)) {
        if (Number(req.body.classroom) < 1 || Number(req.body.classroom) > 30) {
          forbiddenJSON.message = 'Invalid Classroom';
          res.status(forbiddenJSON.status).send(forbiddenJSON);
        } else {
          next();
        }
      } else {
        forbiddenJSON.message = 'Invalid Classroom';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static validateSection(req, res, next) {
    const test = /^D\d\d$/;
    try {
      if (req.body.section === undefined) {
        forbiddenJSON.message = 'Invalid Section';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
      if (test.test(req.body.section)) {
        next();
      } else {
        forbiddenJSON.message = 'Invalid Section';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static validateCR(req, res, next) {
    const test = /^\d+$/;
    try {
      if (req.body.credits === undefined) {
        forbiddenJSON.message = 'Invalid Credits';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
      if (test.test(req.body.credits)) {
        if (Number(req.body.credits < 4) || Number(req.body.credits > 30)) {
          forbiddenJSON.message = 'Invalid Credits';
          res.status(forbiddenJSON.status).send(forbiddenJSON);
        } else {
          next();
        }
      } else {
        forbiddenJSON.message = 'Invalid Credits';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static validateBuilding(req, res, next) {
    const test = /^\d+$/;
    try {
      if (req.body.building === undefined) {
        forbiddenJSON.message = 'Invalid Building';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
      if (test.test(req.body.building)) {
        if (Number(req.body.building < 1) || Number(req.body.building > 40)) {
          forbiddenJSON.message = 'Invalid Building';
          res.status(forbiddenJSON.status).send(forbiddenJSON);
        } else {
          next();
        }
      } else {
        forbiddenJSON.message = 'Invalid Building';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static validateTeacher(req, res, next) {
    const test = /^\d+$/;
    try {
      if (req.body.taught_by === undefined) {
        forbiddenJSON.message = 'Invalid Teacher';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
      if (test.test(req.body.taught_by)) {
        if (Number(req.body.taught_by < 1)) {
          forbiddenJSON.message = 'Invalid Teacher';
          res.status(forbiddenJSON.status).send(forbiddenJSON);
        } else {
          next();
        }
      } else {
        forbiddenJSON.message = 'Invalid Teacher';
        res.status(forbiddenJSON.status).send(forbiddenJSON);
      }
    } catch (e) {
      console.log(e);
    }
  }
}


module.exports = subjectM;
