const router = require('express').Router()
const { filterForMenu, getProductList, processPricing } = require('../middleware/products')

router.use(getProductList, processPricing)

router.get('/', filterForMenu, (req, res) => {
  const errors = req.session.errors
  const info = req.session.info

  req.session.errors = null
  req.session.info = null
  
  res.render('landing', { cssPath: "/css/landing.css", errors, info })
})

router.get('/order', (req, res) => {
  const errors = req.session.errors
  req.session.errors = null

  res.render('order', { cssPath: "/css/order.css", jsPath: "/js/order.js", errors })
})

router.get('/error', (req, res) => {
  res.render('error', { cssPath: "/css/error.css", message: 'Testing styles' })
})

module.exports = router