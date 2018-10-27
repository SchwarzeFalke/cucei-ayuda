// FIXME Los atributos usados para documentacion son en minusculas y de estos solo author es valido
/**
 * @Author: Carlos Vara
 * @Date:   2018-10-11T09:27:15-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-27T04:44:24-05:00
 */

const bcrypt = require('bcrypt');
const mailer = require('../mail');
const { UserMdl, TokenMdl, ResMdl } = require('../models'); // for model handling

// FIXME Todos los metodos deben estar documentados

class Auth {
  static async generateToken(user, type = 'auth') {
    return new Promise(async (resolve, reject) => {
      let usercode;
      if (typeof user[0] === 'undefined') {
        this.key = `${user.name}${user.user_code}ky`;
        usercode = user.user_code;
      } else {
        this.key = `${user[0].name}${user[0].user_code}ky`;
        usercode = user[0].user_code;
      }
      bcrypt.hash(this.key, process.env.SECRET, (hashErr, hash) => {
        let expire;
        let code = null;
        const creation = new Date();
        if (type === 'recover') {
          expire = new Date(creation.getTime() + (5 * 60000));
        } else if (type === 'confirm') {
          expire = new Date(creation.getTime() + (30 * 60000));
          code = Math.floor((Math.random() * 99999) + 1);
        } else {
          expire = new Date(creation.getTime() + (15 * 60000));
        }
        TokenMdl.create({
          token: hash,
          created_at: creation,
          expires: expire,
          type: `${type}`,
          exist: 1,
          confirmation: code,
          user_id: usercode,
        })
          .then(() => resolve({ hash, code }))
          .catch((e) => {
            console.error(`.catch(${hashErr})`);
            reject(e);
          });
      });
    });
  }

  static async register(req, res, next) {
    const newResponse = new ResMdl();
    if (req.session !== undefined && req.session.token.length > 1) {
      newResponse.createResponse('You already have an account', 400, '/users', 'POST');
      newResponse.response.message = newResponse.createMessage();
      next(res.status(newResponse.response.status).send(newResponse.response));
    }
    const newUser = await new UserMdl({ ...req.body });
    await newUser.save();
    try {
      await Auth.generateToken(newUser, 'confirm')
        .then((genToken) => {
          const mailOptions = {
            from: 'cuceiayuda@gmail.com',
            to: `${newUser.email}`,
            subject: 'Confirmation code',
            html: `<p>Hello here! Here is your confirmation code: <b></b>${genToken.code}</p>`,
          };
          mailer.sendMail(mailOptions);
          newResponse.createResponse('Successfully sign up', 200, '/users', 'POST');
          newResponse.response.message = 'Please check-out your email to confirm your registration...';
          newResponse.response.token = genToken.hash;
          newResponse.response.user = newUser.user_code;
          next(res.status(newResponse.response.status).send(newResponse.response));
        });
    } catch (e) {
      newResponse.createResponse(`There is an user with that information ${e}`,
        400, '/users', 'POST');
      newResponse.response.message = newResponse.createMessage();
      next(res.status(newResponse.response.status).send(newResponse.response));
    }
  }

  static async login(req, res, next) {
    const newResponse = new ResMdl();
    if (req.session !== undefined && req.session.token.length > 1) {
      newResponse.createResponse('Successfully logged in', 201, '/users', 'POST');
      newResponse.response.message = newResponse.createMessage();
      next(res.status(newResponse.response.status).send(newResponse.response));
    }
    bcrypt.hash(`${req.body.password}`, process.env.SECRET, (err, hash) => {
      req.body.password = hash;
    });
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
          } else {
            newResponse.createResponse('You are already logged', 200, '/users', 'POST');
            newResponse.response.message = newResponse.createMessage();
            next(res.status(newResponse.response.status).send(newResponse.response));
          }
        })
        .catch(err => console.error(`.catch(${err})`));
    } else {
      newResponse.createResponse('Wrong password or user ID', 409, '/users', 'POST');
      newResponse.response.message = newResponse.createMessage();
      next(res.status(newResponse.response.status).send(newResponse.response));
    }
  }

  static async logout(req, res, next) {
    const newResponse = new ResMdl();
    if (req.headers.authorization === undefined) {
      newResponse.createResponse('You are not logged in or signed up', 409, '/users', 'POST');
      newResponse.response.message = newResponse.createMessage();
      next(res.status(newResponse.response.status).send(newResponse.response));
    } else {
      const token = Auth.getHeaderToken(req.headers.authorization);
      await TokenMdl.get(token)
        .then(async (result) => {
          TokenMdl.destroy(result[0].token);
          newResponse.createResponse('Successfully log-out', 200, '/users', 'POST');
          newResponse.response.message = newResponse.createMessage();
          next(res.status(newResponse.response.status).send(newResponse.response));
        });
    }
  }

  static async confirm(req, res, next) {
    const newResponse = new ResMdl();
    await TokenMdl.confirm(req.body.user, req.body.confirmation)
      .then(async (result) => {
        newResponse.createResponse('Email Confirmation', result.status, '/users', 'POST');
        newResponse.response.message = `${result.message}`;
        next(res.status(newResponse.response.status).send(newResponse.response));
      });
  }

  static async haveSession(req, res, next) {
    if (req.path === '/users/login' || req.path === '/users/logout'
      || req.path === '/users/register' || req.path === '/users/confirmEmail') {
      next();
    } else {
      const newResponse = new ResMdl();
      if (req.headers.authorization === undefined) {
        newResponse.createResponse('You need to log in or sign up', 409, '/users', 'POST');
        newResponse.response.message = newResponse.createMessage();
        next(res.status(newResponse.response.status).send(newResponse.response));
      } else {
        const token = Auth.getHeaderToken(req.headers.authorization);
        await TokenMdl.get(token)
          .then(async (result) => {
            await TokenMdl.active(result).then((active) => {
              if (active === 'NON-ACTIVE') {
                newResponse.createResponse('You need to log in or sign up', 409, '/users', 'POST');
                newResponse.response.message = newResponse.createMessage();
                next(res.status(newResponse.response.status).send(newResponse.response));
              } else {
                Auth.isActive(result[0]);
              }
            });
            await TokenMdl.active(result)
              .then(async (active) => {
                if (active === 'ACTIVE') {
                  req.session = {
                    token: result[0].token,
                    user: await UserMdl.get('*', result[0].user_id),
                  };
                  next();
                } else {
                  newResponse.createResponse('You need to log in or sign up', 409, '/users', 'POST');
                  newResponse.response.message = active;
                  next(res.status(newResponse.response.status).send(newResponse.response));
                }
              });
          });
      }
    }
  }

  static havePermission(req, res, next) {
    this.method = req.method;
    if (req.session.UserMdl.canDo(this.method, req.originalUrl)) {
      next();
    } else {
      res.send('NO tienes permiso man');
    }
  }

  static isActive(token) {
    const time = new Date();
    const tokenTime = new Date(token.expires);
    if (time.getTime() > tokenTime.getTime()) {
      TokenMdl.destroy(token.token);
    }
  }

  static getHeaderToken(bearer) {
    this.bearerToken = bearer.replace('Bearer ', '');
    return this.bearerToken;
  }
}

module.exports = Auth;
