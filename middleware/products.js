const Product = require('../models/Product')

const valid = (productList) => {
  return (!(productList === undefined || productList.length == 0))
}

const getProductByType = async (type) => {
  const products = await Product.find({type}).lean()
  return products
}

const getAllProducts = async (req, res, next) => {
  const cookies = await getProductByType('Cookies')
  const cupcakes = await getProductByType('Cupcakes')
  const nineInch = await getProductByType('9-inch')

  if (valid(cookies) && valid(cupcakes) && valid(nineInch)) {
    res.locals.cookies = cookies
    res.locals.cupcakes = cupcakes
    res.locals.nineInch = nineInch
    next()
  }
  else {
    res.status(500).redirect('/error')
  }
}

module.exports = { getAllProducts }