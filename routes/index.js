const router = require('express').Router()
const { getMenuItems, getProductList } = require('../middleware/products')

router.get('/', getMenuItems, (req, res) => {
  res.render('landing', { cssPath: "/css/landing.css", jsPath: "" })
})

router.get('/order', getProductList, (req, res) => {
  res.render('order', { cssPath: "/css/order.css", jsPath: "/js/order.js" })
})

router.get('/error', (req, res) => {
  res.render('error', { message: "test" })
})

module.exports = router