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

const getSizesAndPrices = (products) => {
  let sizes = ['', '', '']
  let prices = ['', '', '']

  for (let i = 0; i < 3; ++i) {
    sizes[i] = products[i].sizing
    prices[i] = products[i].pricing
  }

  /* sizes.forEach((itemSizing) => {
    itemSizing.split(',')
  }) */

  console.log(sizes, prices)

  return { sizes, prices }
}

module.exports = { getProductByType, getSizesAndPrices }
