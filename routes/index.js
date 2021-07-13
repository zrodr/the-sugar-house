const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('landing')
})

router.get('/order', (req,res) => {
  res.render('order')
})

router.post('/order', (req, res) => {
  const { item, quantity } = req.body
  console.log(req.body)

  res.status(200).redirect('/')
})

module.exports = router