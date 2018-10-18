/**
 * @Author: Carlos Vara
 * @Date:   2018-10-11T09:27:15-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-16T13:23:22-05:00
 */

const bcrypt = require('bcrypt');
const { UserMdl } = require('../models'); // for model handling
const { TokenMdl } = require('../models'); // for model handling

class Auth {
  generate(user) {
    this.key = `${user.name}${user.user_code}ky`;
    bcrypt.hash(this.key,
      process.env.SECRET, (err, hash) => {
        TokenMdl.create({
          token: hash,
          created_at: new Date(),
          duration: 12,
          type: 's',
          exist: 1,
          user_id: user.id,
        })
          .then(() => hash)
          .catch(e => console.error(`.catch(${e})`));
      });
  }

  register(req, res, next) {
    this.newUser = new UserMdl({ ...req.body });
    this.newUser.save()
      .then(() => {
        Auth.generate(this.newUser);
        next();
      })
      .catch((e) => {
        console.error(`.catch(${e})`);
        next(e);
      });
  }

  login(req, res, next) {
    this.user = UserMdl.get('*', req.user_id, `${req.password}`);
    if (this.user.user_id !== undefined) {
      const data = {
        user: this.user.userId,
        token: null,
      };
      TokenMdl.active(data)
        .then((result) => {
          if (result === 'NON-ACTIVE') {
            Auth.generate(this.user);
          }
          next();
        })
        .catch(e => console.error(`.catch(${e})`));
    } else {
      next('Wrong user or password');
    }
  }

  logout(token, next) {
    this.statusToken = TokenMdl.get(token);
    if (this.statusToken) {
      TokenMdl.destroy(token)
        .then(() => next())
        .catch((e) => {
          console.error(`.catch(${e})`);
          next(e);
        });
    }
  }
}

module.exports = Auth;
