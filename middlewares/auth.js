/**
 * @Author: Carlos Vara
 * @Date:   2018-10-11T09:27:15-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-16T10:37:04-05:00
 */

const bcrypt = require('bcrypt');
const { UserMdl } = require('../models'); // for model handling
const { TokenMdl } = require('../models'); // for model handling

class Auth {
  generateToken(user) {
    this.key = `${user.name}${user.user_code}ky`;
    bcrypt.hash(this.key,
      process.env.SECRET, (err, hash) => {
        TokenMdl.create({
          token: hash,
          created_at: new Date(),
          duration: 12,
          type: 's',
          active: 1,
          user_id: user.id,
        })
          .then(() => hash)
          .catch(e => console.error(`.catch(${e})`));
      });
  }

  register(req, res, next) {
    //  hashear contraseña
    bcrypt(`${req.body.password}`, process.env.SECRET, (err, hash) => {
      req.body.password = hash;
    });
    this.newUser = new UserMdl({ ...req.body });
    this.newUser.save()
      .then(() => {
        this.token = Auth.generateToken(this.newUser);
        res.send(this.token);
        next();
      })
      .catch((e) => {
        console.error(`.catch(${e})`);
        next(e);
      });
  }

  login(req, res, next) {
    this.user = UserMdl.get('*', req.user_id, `${req.password}`);
    bcrypt.compare(req.body.password, this.user.password, (err, result) => {
      if (result === true && this.user.user_id !== undefined) {
        this.activeToken = TokenMdl.active(this.user.user_id);
        if (this.activeToken === false) {
          this.token = Auth.generateToken(this.user);
          res.send(this.token);
          next();
        } else {
          res.send(this.token);
          next();
        }
      }
    });
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
