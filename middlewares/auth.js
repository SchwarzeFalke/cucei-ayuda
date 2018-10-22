// FIXME Los atributos usados para documentacion son en minusculas y de estos solo author es valido
/**
 * @Author: Carlos Vara
 * @Date:   2018-10-11T09:27:15-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-22T03:25:14-05:00
 */

const bcrypt = require('bcrypt');
const { UserMdl, TokenMdl, ResMdl } = require('../models'); // for model handling

// FIXME Todos los metodos deben estar documentados

class Auth {
  static async generateToken(user) {
    return new Promise(async (resolve, reject) => {
      this.key = `${user[0].name}${user[0].user_code}ky`;
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
            .then(() => resolve(hash))
            .catch((e) => {
              console.error(`.catch(${hashErr})`);
              reject(e);
            });
        });
      });
    });
  }

  static async register(req, res, next) {
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
    const newResponse = new ResMdl();
    if (req.session !== undefined && req.session.token.length > 1) {
      newResponse.createResponse('Successfully logged in', 201, '/users', 'POST');
      newResponse.response.message = newResponse.createMessage();
      next(res.status(newResponse.response.status).send(newResponse.response));
    }
    const user = await UserMdl.get('*', `${req.body.user_id}`, { password: req.body.password });
    if (user[0].user_code !== undefined) {
      const data = {
        user: user[0].user_code,
        token: null,
      };
      await TokenMdl.active(data)
        .then(async (active) => {
          if (active === 'NON-ACTIVE') {
            const response = {
              created_at: new Date(),
              userId: user[0].user_code,
              token: await Auth.generateToken(user),
            };
            res.send(response);
            next();
          }
          next();
        })
        .catch(err => console.error(`.catch(${err})`));
    } else {
      newResponse.createResponse('Wrong password or user ID', 409, '/users', 'POST');
      newResponse.response.message = newResponse.createMessage();
      next(res.status(newResponse.response.status).send(newResponse.response));
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

  static async haveSession(req, res, next) {
    const newResponse = new ResMdl();
    if (req.headers.authorization === undefined) {
      newResponse.createResponse('You need to log in or sign up', 409, '/users', 'POST');
      newResponse.response.message = newResponse.createMessage();
      next(res.status(newResponse.response.status).send(newResponse.response));
    } else {
      const token = Auth.getHeaderToken(req.headers.authorization);
      await TokenMdl.get(token)
        .then(async (result) => {
          await TokenMdl.active(result)
            .then(async (active) => {
              if (active) {
                req.session = {
                  token: result[0].token,
                  user: await UserMdl.get('*', result[0].user_id),
                };
                next();
              } else {
                newResponse.createResponse('You need to log in or sign up', 409, '/users', 'POST');
                newResponse.response.message = newResponse.createMessage();
                next(res.status(newResponse.response.status).send(newResponse.response));
              }
            });
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

  isActive(req, res, next) {
    const time = new Date();
    if (time > this.token.created + this.token.expires) {
      this.token.destroy();
      return false;
    }
    return true;
  }

  static getHeaderToken(bearer) {
    this.bearerToken = bearer.replace('Bearer ', '');
    return this.bearerToken;
  }
}

module.exports = Auth;
