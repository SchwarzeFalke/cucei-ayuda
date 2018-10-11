/**
 * @Author: schwarze_falke
 * @Date:   2018-10-11T09:27:15-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-11T09:46:09-05:00
 */
const bcrypt = require('bcrypt');

class Auth {
  register(req, res, next) {
    user = User.create(req);
    // Create token
    bcrypt.hash('asdasd', process.env.SECRET, (err, hash) => {
      Token.create({
        token,
        created_at: new Date(),
        duration: 12,
        type: 's',
        active: 1,
        user_id: user.id,
      });
    });

    next();
  }
}
