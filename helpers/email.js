const nodemailer = require('nodemailer')

const sendEmailNotification = (from, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.TSH_ORDER_EMAIL,
      pass: process.env.TSH_ORDER_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const mailOptions = {
    from,
    to: process.env.TSH_EMAIL,
    subject,
    text
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