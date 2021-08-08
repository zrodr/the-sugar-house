const router = require('express').Router()
const { filterForMenu, getProductList, processPricing } = require('../middleware/products')

router.use(getProductList, processPricing)

router.get('/', filterForMenu, (req, res) => {
  res.render('landing', { cssPath: "/css/landing.css", jsPath: "" })
})

router.get('/order', (req, res) => {
  res.render('order', { cssPath: "/css/order.css", jsPath: "/js/order.js" })
})

/* router.get('/error', (req, res) => {
  res.render('error', { message: "test" })
}) */

module.exports = router