const router = require('express').Router()
const sendEmail = require('../helpers/email')

router.post('/', (req, res) => {
  console.log(req.body)
  res.status(200).redirect('/')
})

router.post('/custom', (req, res) => {
  console.log(req.body)
  const { from, subject, body } = req.body

  sendEmail(from, subject, body)

  res.status(200).redirect('/')
})

module.exports = router