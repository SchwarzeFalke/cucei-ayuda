/**
 * @Author: schwarze_falke
 * @Date:   2018-09-30T13:26:40-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-01T01:09:06-05:00
 */
class Validator {
  static get regex() {
    return {
      stud_code: /^[1-9]+[0-9]*$/,
      name: /[a-zA-ZñÑ ]{3,}/,
      email: /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/,
    };
  }

  static name(data) {
    return (Validator.regex.word.test(data));
  }

  static studCode(data) {
    return (Validator.regex.stud_code.test(data));
  }

  static required(data) {
    return data !== undefined && data !== null && data.length;
  }

  static email(data) {
    return (Validator.regex.email.test(data));
  }

  static validate(req, res, next, rules) {
    const error = {
      message: 'Validation Error',
      status: 409,
      details: {},
    };
    for (let part in rules) {
      for (let field in rules[part]) {
        let validators = rules[part][field].split(',');
        validators.forEach((f) => {
          if (!Validator[f](req[part][field] || '')) {
            if (Array.isArray(error.details[field])) {
              error.details[field].push(`The field ${field} should be a valid ${f}`);
            } else {
              error.details[field] = [`The field ${field} should be a valid ${f}`];
            }
          }
        });
      }
    }
    Object.keys(error.details).length ? next(error) : next();
  }
}

module.exports = Validator;
