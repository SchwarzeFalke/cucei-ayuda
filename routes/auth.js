/**
 * @Author: brandonmdiaz
 */
const bcrypt = require('bcrypt');
const { Router } = require('express');
const mailer = require('../mail');
const { ResetPassword } = require('../models');
const { Auth } = require('../middlewares');
const { UserMdl, TokenMdl, ResMdl } = require('../models'); // for model handling

const router = Router();


router.get('/password_reset', (req, res) => {
  const newResponse = new ResMdl();
  const userEmail = req.query.email;
  // validar email.
  if (ResetPassword.validEmail(userEmail)) {
    // revisamos que el usuario exista usando su email
    ResetPassword.findUser(userEmail).then((result) => {
      console.log(result);
      this.user = result;
      if (this.user === undefined || this.user.length === 0) {
        newResponse.createResponse('Try another email', 400, '/auth', 'GET');
        newResponse.response.message = newResponse.createMessage();
        res.status(newResponse.response.status).send(newResponse.response);
      } else {
        // creamos token
        Auth.generateToken(this.user, 'recover').then((results) => {
          const token = results.hash;
          const mailOptions = {
            to: `${userEmail}`,
            subject: 'Reset Password',
            text: `https://cucei-ayuda.herokuapp.com/auth/recover/?q=${token}`,
            html: `<b>Recuperando contraseña, espera un segundo
            https://cucei-ayuda.herokuapp.com/auth/recover/?q=${token} </b>`,
          }; // fin mailOptions
          mailer.sendMail(mailOptions);
          newResponse.createResponse('Message sent to email', 200, '/auth', 'GET');
          newResponse.response.message = newResponse.createMessage();
          res.status(newResponse.response.status).send(newResponse.response);
        }).catch((e) => {
          console.log(e);
        });
      } // fin else
    }).catch((e) => {
      console.log(e);
    });
  } else {
    newResponse.createResponse('Something went wrong', 400, '/auth', 'GET');
    newResponse.response.message = newResponse.createMessage();
    res.status(newResponse.response.status).send(newResponse.response);
  }
});

router.post('/recover', async (req, res) => {
  const newResponse = new ResMdl();
  const token = {
    token: req.query.q,
  };
  const tokenStatus = await TokenMdl.active(token);
  if (tokenStatus === 'ACTIVE') {
    // obtenemos el id del usuario
    try {
      this.userId = await TokenMdl.get(token.token);
      this.userId = this.userId[0].user_id;
      // Obtenemos todos los datos del usuario
      let user = await UserMdl.get('*', this.userId);
      // cambiamos el password del usuario
      req.body.password = await bcrypt.hash(`${req.body.password}`, process.env.SECRET);
      user.password = req.body.password;
      // creamos un modelo con todos los datos del usuario
      user = new UserMdl(user);
      // modificamos el usuario
      await user.update(this.userId);// validar esta parte
      newResponse.createResponse('Password modified Successfully', 200, '/auth', 'POST');
      newResponse.response.message = newResponse.createMessage();
      res.status(newResponse.response.status).send(newResponse.response);
    } catch (e) {
      console.log(e);
    }
  } else {
    newResponse.createResponse("Token doesn't exist", 400, '/auth', 'POST');
    newResponse.response.message = newResponse.createMessage();
    res.status(newResponse.response.status).send(newResponse.response);
  }
});
module.exports = router;
