const { getProducts, filterByProductType, getSizesAndPrices } = require('../helpers/getproducts')

/* middleware chaining for products must begin here, once the db data is fetched,
   we can perform additional operations on it */
const getProductList = async (req, res, next) => {
  try {
    const products = await getProducts()
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
    const { cookieInfo, cupcakeInfo, nineInchInfo } = getSizesAndPrices(res.locals.products)

    res.locals.cookiePricing = cookieInfo
    res.locals.cupcakePricing = cupcakeInfo
    res.locals.nineInchPricing = nineInchInfo

    next()
  }
  catch (err) {
    next(err)
  }
}

const filterForMenu = (req, res, next) => {
  try {
    const { cookies, cupcakes, nineInch } = filterByProductType(res.locals.products)

    res.locals.cookies = cookies
    res.locals.cupcakes = cupcakes
    res.locals.nineInch = nineInch

    /* filter out menu sizes greater than 12, since rates are by the dozen */
    const gtDozen = (pricing) => {
      /* grab index corresponding to item quantity */
      const amount = pricing.split(' ')[0]
      return !(parseInt(amount, 10) >= 12)
    }

    res.locals.cookiePricing = res.locals.cookiePricing.filter(gtDozen)
    res.locals.cupcakePricing = res.locals.cupcakePricing.filter(gtDozen)

    /* Unneeded for menu display */
    res.locals.nineInchPricing = null
    /* clean up after original db query data. Avoids storing full list and 
       sub-arrays at the same time. */
    res.locals.products = null

    next()
  }
  catch (err) {
    next(err)
  }
}

module.exports = { getProductList, processPricing, filterForMenu }