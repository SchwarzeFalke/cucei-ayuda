// FIXME Los atributos usados para documentacion son en minusculas y de estos solo author es valido
/**
 * @Author: Carlos Vara
 * @Date:   2018-10-11T09:27:15-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-21T16:38:02-05:00
 */

const bcrypt = require('bcrypt');
const { UserMdl } = require('../models'); // for model handling
const { TokenMdl } = require('../models'); // for model handling

// FIXME Todos los metodos deben estar documentados

class Auth {
  static async generateToken(user) {
    this.key = `${user[0].name}${user[0].user_code}ky`;
    console.log(this.key);
    await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.key, salt, (hashErr, hash) => {
        TokenMdl.create({
          token: hash,
          created_at: new Date(),
          expires: new Date(),
          type: 's',
          exist: 1,
          user_id: user[0].user_code,
        })
          .then(() => hash)
          .catch((e) => {
            console.error(`.catch(${hashErr})`);
            throw e;
          });
      });
    }).catch((err) => { throw err; });
  }

  async register(req, res, next) {
    bcrypt(`${req.body.password}`, process.env.SECRET, (err, hash) => {
      req.body.password = hash;
    });
    this.newUser = new UserMdl({ ...req.body });
    try {
      await this.newUser.save();
      this.token = Auth.generateToken(this.newUser);
      res.send(this.token);
      next({
        token: this.token,
        user: this.newUser,
      });
    } catch (e) {
      console.error(`.catch(${e})`);
      next(e);
    }
  }

  static async login(req, res, next) {
    const user = JSON.parse(JSON.stringify(await UserMdl.get('*', `${req.body.user_id}`)));
    if (user[0].user_code !== undefined) {
      const data = {
        user: user[0].user_code,
        token: null,
      };
      const active = await TokenMdl.active(data);
      if (active === 'NON-ACTIVE') {
        res.send(await Auth.generateToken(user));
        next();
      } else {
        next();
      }
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

  haveSession(req, res, next) {
    const token = this.getHeaderToken(req.headers.authorization);
    this.token = TokenMdl.get(token);
    if (this.isActive()) {
      req.session = {
        token: this.token,
        user: UserMdl.get(this.token.userId),
      };
      next();
    } else {
      next({
        status: 403,
        message: 'You need to loggin',
      });
    }
  }

  havePermission(req, res, next) {
    this.method = req.method;
    if (req.session.UserMdl.canDo(this.method, req.originalUrl)) {
      next();
    } else {
      res.send('NO tienes permiso man');
    }
  }

  isActive() {
    const time = new Date();
    if (time > this.token.created + this.token.expires) {
      this.token.destroy();
      return false;
    }
    return true;
  }

  getHeaderToken(bearer) {
    //  obtenemos token
    this.bearerToken = bearer.split('')[1];
    return this.bearerToken;
  }

}

module.exports = Auth;
