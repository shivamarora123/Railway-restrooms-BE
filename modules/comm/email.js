const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const app = require(__base + 'app.js');
const config = require(__base + 'system/config.js')

const mailAccountUser = config.details.Mail.username
const mailAccountPassword = config.details.Mail.password

// main work is done by this smtpTransport so at new signup the value of to toEmailAddress should be
// equal to the Users[0].email  you the know the best.

const transport = nodemailer.createTransport(smtpTransport({
    service: config.details.Mail.host,
    auth: {
        user: mailAccountUser,
        pass: mailAccountPassword
    }
}))

const sendEMail = (address, subject, message) => {
  let mail = {
    from: mailAccountUser,
    to: address,
    subject: subject,
    text: message
  }
  transport.sendMail(mail, (error, response) => {
    if(error){
        console.log(error);
    }
    else{
        console.log("Email sent: " + response)
    }
    transport.close();
  });
}

module.exports = sendEMail
