const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('landing', {cssPath:"/css/landing.css", jsPath:""})
})

router.get('/order', (req,res) => {
  res.render('order', {cssPath:"/css/order.css", jsPath:"/js/order.js"})
})

router.post('/order', (req, res) => {
  console.log(req.body)
  res.status(200).redirect('/')
})

module.exports = router