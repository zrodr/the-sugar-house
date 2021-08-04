const Product = require('../models/Product')

const valid = (productList) => (!(productList === undefined || productList.length == 0))

const getProductByType = async (type) => {
  let products
  //no parameter fetches list of all products 
  if (type === undefined) {
    products = await Product.find({}).lean()
  }
  else {
    products = await Product.find({ type }).lean()
  }

  if (!valid(products)) throw new Error('Could not fetch products from DB')

  return products
}

const getProductList = async (req, res, next) => {
  try {
    const products = await getProductByType('')
    res.locals.products = products

    next()
  }
  catch (err) {
    next(err)
  }
}

const getMenuItems = async (req, res, next) => {
  try {
    const cookies = await getProductByType('Cookies')
    const cupcakes = await getProductByType('Cupcakes')
    const nineInch = await getProductByType('9-inch')

    res.locals.cookies = cookies
    res.locals.cupcakes = cupcakes
    res.locals.nineInch = nineInch

    next()
  }
  catch (err) {
    next(err)
  }
}

module.exports = { getMenuItems, getProductList }