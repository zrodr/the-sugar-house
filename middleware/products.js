const { getProductByType, getSizesAndPrices } = require('../helpers/getproducts')

const getProductList = async (req, res, next) => {
  try {
    const products = await getProductByType()
    res.locals.products = products

    next()
  }
  catch (err) {
    next(err)
  }
}

/*
* Meant to be called after products are fetched from db. Adds sizing and
* pricing to response in a presentable format 
*/
const processPricing = (req, res, next) => {
  try {
    const { sizes, pricing } = getSizesAndPrices(res.locals.products)

    //TODO: Process the string arrays and match sizes to ther price counterpart

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

module.exports = { getProductList, processPricing, getMenuItems }