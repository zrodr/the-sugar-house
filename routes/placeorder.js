const router = require('express').Router()
const { sendEmailNotification } = require('../helpers/email')

router.post('/', (req, res, next) => {
  console.log(req.body)

  // TODO: finish with processing the body and making email readable
  
  try {
    //sendEmailNotification()
    res.status(200).redirect('/')
  }
  catch(err) {
    next(err)
  }
})

router.post('/custom', async (req, res, next) => {
  console.log(req.body)
  const { from, subject, body } = req.body

  try {
    await sendEmailNotification(from, subject, body)
    res.status(200).redirect('/')
  }
  catch (err) {
    next(err)
  }

})

module.exports = router