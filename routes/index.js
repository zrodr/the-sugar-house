const router = require('express').Router()
const { filterForMenu, getProductList, processPricing } = require('../middleware/products')

router.use(getProductList, processPricing)

router.get('/', filterForMenu, (req, res) => {
  const errors = req.session.errors
  const info = req.session.info
  const formVals = req.session.formVals

  req.session.errors = null
  req.session.info = null
  req.session.formVals = null

  res.render('landing', {
    cssPath: "/css/landing.css",
    errors,
    info,
    formVals
  })
})

router.get('/order', (req, res) => {
  const errors = req.session.errors
  const formVals = req.session.formVals

  req.session.errors = null
  req.session.formVals = null

  res.render('order', {
    cssPath: "/css/order.css",
    jsPath: "/js/order.js",
    errors,
    formVals
  })
})

router.get('/error', (req, res) => {
  res.render('error', {
    cssPath: "/css/error.css",
    message: 'Testing styles',
    code: 420
  })
})

module.exports = router