const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const sendEmailNotification = (from, subject, text) => {
  const OAuth2Client = new google.auth.OAuth2(process.env.OAUTH_CLIENT, process.env.OAUTH_SECRET, process.env.OAUTH_REDIRECT)
  OAuth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH })

  const accessToken = OAuth2Client.getAccessToken() 

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.TSH_ORDER_EMAIL,
      clientId: process.env.OAUTH_CLIENT,
      clientSecret: process.env.OAUTH_SECRET,
      refreshToken: process.env.OAUTH_REFRESH,
      accessToken
    }
  })

  const mailOptions = {
    to: process.env.TSH_EMAIL,
    subject,
    text: 'Order from: '.concat(from, '\n', text)
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Failed to send email: ', err)
      throw new Error(err)
    }
    else {
      console.log('Email sent: ', info)
    }
    
    transporter.close()
  })
}


module.exports = sendEmailNotification