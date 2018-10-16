/**
 * @Author: Carlos Vara
 * @Date:   2018-10-11T09:27:15-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-16T10:19:34-05:00
 */

const bcrypt = require('bcrypt');
const { UserMdl } = require('../models'); // for model handling
const { TokenMdl } = require('../models'); // for model handling

class Auth {
  generate(user) {
    bcrypt.hash(`${user.name}${this.newUser.user_code}`,
      process.env.SECRET, (err, hash) => {
        TokenMdl.create({
          token: hash,
          created_at: new Date(),
          duration: 12,
          type: 's',
          active: 1,
          user_id: this.newUser.id,
        }).then(() => {
          res.send({
            data: {
              hash,
            },
          }).status(201);
        });
      });
  }

  register(req, res, next) {
    bcrypt(`${req.body.password}`, process.env.SECRET, (err, hash) => {
      req.body.password = hash;
    });
    this.newUser = new UserMdl({ ...req.body });
    this.newUser.save()
      .then(() => {

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
      TokenMdl.active(this.user.user_id)
        .then((result) => {
          console.log(result);
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

  session(token, next) {
    this.statusToken = TokenMdl.get(token);
    if ()
  }
}

module.exports = Auth;
