const router = require('express').Router()
const { formatEmail, sendEmailNotification } = require('../helpers/email')
const { validateFields } = require('../helpers/validation')

router.post('/', async (req, res, next) => {
  const orderContent = Object.values(req.body)
  console.log(orderContent)

  if (!validateFields(orderContent)) {
    res.redirect('/order')
  }
  else {
    console.log(req.body)
    const { from, subject, body } = formatEmail(orderContent)

    try {
      await sendEmailNotification(from, subject, body, false)
      console.log(from, subject, body)
      res.status(200).redirect('/')
    }
    catch (err) {
      next(err)
    }
  }
})

router.post('/custom', async (req, res, next) => {
  const { from, subject, body } = req.body

  try {
    await sendEmailNotification(from, subject, body, true)
    res.status(200).redirect('/')
  }
  catch (err) {
    next(err)
  }
})

module.exports = router