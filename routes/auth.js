/**
 * @Author: schwarze_falke
 * @Date:   2018-10-11T09:44:49-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-11T09:44:49-05:00
 */

const { Router } = require('express');

const router = Router();


router.get('/auth/password_reset', (req, res, next) => {
  const userEmail = req.params.email;
  const mailOptions = {
    to: `${userEmail}`,
    subject: 'Reset Password',
    text: '/auth/recover/(dsfdsafsafdsa/${token})',
    html: '<b>Recuperando contraseña, espera un segundo. </b>'
  };
});

router.post('/auth/recover', (req, res, next) => {

});
