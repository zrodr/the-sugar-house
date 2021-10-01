const nodemailer = require('nodemailer')

const formatEmail = (fields) => {
  const from = fields[0] //email field
  let subject = 'Order: www.tsh.com'
  let body = ''

  for (let i = 1; i < fields.length; i += 2) {
    const item = fields[i].concat(' ', fields[i + 1], '\n')
    body = body.concat(item)
  }

  return { from, subject, body }
}


const sendEmailNotification = async (sender, subject, text, custom) => {
  const transporter = nodemailer.createTransport({
    name: process.env.OUTLOOK_ORIGIN,
    host: 'smtp-mail.outlook.com',
    port: 587,
    secureConnection: false,
    tls: {
      ciphers: 'SSLv3'
    },
    auth: {
      user: process.env.TSH_ORDER_EMAIL,
      pass: process.env.TSH_ORDER_PASS
    }
  })

  const orderType = (custom ? 'Custom order \n\n' : 'Order \n\n')

  const mailOptions = {
    from: process.env.TSH_ORDER_EMAIL,
    to: process.env.TSH_EMAIL,
    subject,
    text: orderType.concat('Customer contact: '.concat(sender), '\n\n', text)
  }

  try {
    await transporter.sendMail(mailOptions)
  }
  catch (err) {
    throw new Error(err)
  }
  finally {
    transporter.close()
  }
}

module.exports = { formatEmail, sendEmailNotification }