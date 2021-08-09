const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const sendEmailPromise = (transporter, mailOptions) => {
  return transporter.sendMail(mailOptions)


  /* transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      transporter.close()
      reject(err)
      //throw new Error('Could not send email! Please try again.')
    }
    else {
      console.log('Email sent: ', info)
      transporter.close()
      resolve(info)
    }
  }) */
}

const sendEmailNotification = async (from, subject, text) => {
  let transporter
  try {
    const OAuth2Client = new google.auth.OAuth2(process.env.OAUTH_CLIENT, process.env.OAUTH_SECRET, process.env.OAUTH_REDIRECT)
    OAuth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH })

    const accessToken = OAuth2Client.getAccessToken()

    transporter = nodemailer.createTransport({
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

    const result = await sendEmailPromise(transporter, mailOptions)
    console.log('Sent mail!:', result)
  } catch (err) {
    throw new Error(err)
  }
  finally {
    transporter.close()
  }
}

module.exports = { sendEmailNotification }