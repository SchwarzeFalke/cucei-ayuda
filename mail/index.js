// npm install nodemailer
//
// como con la base de datos se tiene que tener un servidor que se encarge de
// enviar y recivir. (se puede usar gmail pero te pide ciertos requisitos).
//
// hay varias plataformas para usar pruebas, nosotros usaremos uno, se llama ethereal (smtp fake)
// mailtrap es otra opcion,
//
// lo primero seria crear un transporter para podernos conectar al servidor se smtp

const nodemailer = require('nodemailer');

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      servise: 'gmail',
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: 'brandonmdflores@gmail.com',
        pass: 'cappuchini123',
      },
    });

    this.mailOptions = {
      from: '"Cucei Ayuda" <brandonmanuel@gmail.com>',
    };
  }

  //es importante hacer un verify para mostrar si se pudo conectar al servidor.
  // this.transporter.verify()

  //enviar emails eventualmente
  sendMail(options) {
    console.log('Enviando email')
    const mailOptions = {
      ...this.mailOptions,
      ...options,
    };
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  }
}

module.exports = new Mailer();
