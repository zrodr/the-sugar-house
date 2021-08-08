const Product = require('../models/Product')

const valid = (productList) => (!(productList === undefined || productList.length == 0))

const getProducts = async () => {
  const products = await Product.find({}).lean()

  if (!valid(products)) throw new Error('Could not fetch products from DB')

  return products
}

const filterByProductType = (products) => {
  const cookies = products.filter((product) => product.type === 'Cookies')
  const cupcakes = products.filter((product) => product.type === 'Cupcakes')
  const nineInch = products.filter((product) => product.type === '9-inch')

  return { cookies, cupcakes, nineInch }
}

const getSizesAndPrices = (products) => {
  const cookie = products.find((product) => product.type === 'Cookies')
  const cupcake = products.find((product) => product.type === 'Cupcakes')
  const nineInch = products.find((product) => product.type === '9-inch')

  const sizesAndPrices = {
    cookieInfo: [],
    cupcakeInfo: [],
    nineInchInfo: []
  }

  sizesAndPrices.cookieInfo = cookie.sizing.map((size, idx) => `${size} - $${cookie.pricing[idx]}`)
  sizesAndPrices.cupcakeInfo = cupcake.sizing.map((size, idx) => `${size} - $${cupcake.pricing[idx]}`)
  sizesAndPrices.nineInchInfo = nineInch.sizing.map((size, idx) => `${size} - $${nineInch.pricing[idx]}`)

  return sizesAndPrices
}

module.exports = { getProducts, filterByProductType, getSizesAndPrices }
