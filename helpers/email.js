const nodemailer = require('nodemailer')

const sendEmailNotification = (from, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type:'OAuth2',
      user: process.env.TSH_ORDER_EMAIL,
      pass: process.env.TSH_ORDER_PASS,
      clientId: process.env.OAUTH_CLIENT,
      clientSecret: process.env.OAUTH_SECRET,
      refreshToken: process.env.OAUTH_REFRESH
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const mailOptions = {
    to: process.env.TSH_EMAIL,
    subject,
    text: 'Order from: '.concat(from, '\n', text)
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      console.log(err)
    }
    else {
      console.log('Email sent!')
    }
  })
}


module.exports = sendEmailNotification