const router = require('express').Router()
const { filterForMenu, getProductList, processPricing } = require('../middleware/products')

router.use(getProductList, processPricing)

router.get('/', filterForMenu, (req, res) => {
  const errors = req.session.errors
  req.session.errors = null
  res.render('landing', { cssPath: "/css/landing.css", errors })
})

router.get('/order', (req, res) => {
  const errors = req.session.errors
  req.session.errors = null
  res.render('order', { cssPath: "/css/order.css", jsPath: "/js/order.js", errors })
})

module.exports = router