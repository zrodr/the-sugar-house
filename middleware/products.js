const Product = require('../models/Product')

const getAllProducts = async (req, res, next) => {
  const products = await Product.find({}).lean()

  if (!(products === undefined || products.length == 0)) {
    res.locals.products = products
    next()
  }
  else {
    res.status(500).redirect('/error')
  }
}

module.exports = { getAllProducts }