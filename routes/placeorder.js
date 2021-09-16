const router = require('express').Router()
const { body, validationResult } = require('express-validator')

const { formatEmail, sendEmailNotification } = require('../helpers/email')

router.post('/', [
  body('email', 'Must provide a valid email!').isEmail(),
  body('item', 'Please select items!').trim().isAscii(),
  body('quantity', 'Please select amounts!').trim().isAscii(),
], async (req, res, next) => {
  const errors = validationResult(req).array()
  const { email } = req.body

  if (errors.length) {
    req.session.errors = errors
    req.session.formVals = email
    return res.redirect('/order')
  }

  const orderContent = Object.values(req.body)
  const { from, subject, body } = formatEmail(orderContent)

  try {
    await sendEmailNotification(from, subject, body, false)
    req.session.info = "Thanks for your order! Expect an email soon to confirm pricing!"
    res.status(200).redirect('/')
  }
  catch (err) {
    next(err)
  }
})

router.post('/custom', [
  body('from', 'Must provide a valid email!').isEmail(),
  body('subject', 'Fields cannot be blank!').trim().isAscii(),
  body('body', 'Fields cannot be blank!').trim().isAscii()
], async (req, res, next) => {
  const errors = validationResult(req).array()
  const { from, subject, body } = req.body

  if (errors.length) {
    req.session.errors = errors
    req.session.formVals = { from, subject, body }
    return res.redirect('/#email-form')
  }

  try {
    await sendEmailNotification(from, subject, body, true)
    req.session.info = "Thanks for reaching out! We'll get back to you soon!"
    res.status(200).redirect('/')
  }
  catch (err) {
    next(err)
  }
})

module.exports = router