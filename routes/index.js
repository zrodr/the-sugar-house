const router = require('express').Router()
const { getAllProducts } = require('../middleware/products')

router.get('/', getAllProducts, (req, res) => {
  res.render('landing', {cssPath:"/css/landing.css", jsPath:""})
})

router.get('/order', (req,res) => {
  res.render('order', {cssPath:"/css/order.css", jsPath:"/js/order.js"})
})

router.get('/error', (req, res) => {
  res.render('error')
})

module.exports = router