const router = require('express').Router()
const test = [1, 2, 3]

router.get('/', (req, res) => {
  res.render('landing', {cssPath:"/css/landing.css", jsPath:"", test})
})


router.get('/order', (req,res) => {
  res.render('order', {cssPath:"/css/order.css", jsPath:"/js/order.js"})
})

router.post('/order', (req, res) => {
  console.log(req.body)
  res.status(200).redirect('/')
})

module.exports = router