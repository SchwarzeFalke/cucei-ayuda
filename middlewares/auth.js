// FIXME Los atributos usados para documentacion son en minusculas y de estos solo author es valido
/**
 * @Author: schwarze_falke
 * @Date:   2018-10-11T09:27:15-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-11T09:46:09-05:00
 */
const bcrypt = require('bcrypt');

// FIXME Todos los metodos deben estar documentados

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
