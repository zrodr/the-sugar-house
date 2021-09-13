const router = require('express').Router()
const { body, validationResult } = require('express-validator')

const { formatEmail, sendEmailNotification } = require('../helpers/email')

router.post('/', [
  body('from', 'Email must be valid!').isEmail(),
  body('item', 'Please select an item!').exists({ checkFalsy: true }),
  body('quantity', 'Please select an amount!').exists({ checkFalsy: true }),
], async (req, res, next) => {
  const errors = validationResult(req).array()

  if (errors.length) {
    req.session.errors = errors
    return res.redirect('/order')
  }

  const orderContent = Object.values(req.body)
  const { from, subject, body } = formatEmail(orderContent)

  try {
    await sendEmailNotification(from, subject, body, false)
    console.log(errors)
    res.status(200).redirect('/')
  }
  catch (err) {
    next(err)
  }
})

router.post('/custom', [
  body('from', 'Must provide a valid email!').isEmail(),
  body('subject', 'Fields cannot be blank!').exists({ checkFalsy: true }),
  body('body', 'Fields cannot be blank!').exists({ checkFalsy: true }),
], async (req, res, next) => {
  const errors = validationResult(req).array()

  if (errors.length) {
    req.session.errors = errors
    return res.redirect('/#email-form')
  }

  try {
    await sendEmailNotification(from, subject, body, true)
    res.status(200).redirect('/')
  }
  catch (err) {
    next(err)
  }
})

module.exports = router