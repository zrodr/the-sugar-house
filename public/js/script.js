var itemCount = 1;
const orderform = document.getElementById('order-form')
const addItem = document.getElementById('add-item')

const addFormField = (e) => {
  e.preventDefault()

  const items = [
    "Chocolate Chip Cookie",
    "Snickerdoodle Cookie",
    "Peanut Butter Cookie",
    "M&M Brownie Cupcake",
    "9-inch Brownie",
    "9-inch Blondie",
    "9-inch Lemon Cake",
    "Lemon Pound Cake (loaf)"
  ]

  const itemLabel = document.createElement('label')
  const select = document.createElement('select')

  itemLabel.setAttribute('for', `item-${itemCount}`)
  itemLabel.appendChild(document.createTextNode("Item:"))
  select.setAttribute('name', `item-${itemCount}`)

  const amountLabel = document.createElement('label')
  const amount = document.createElement('input')

  amountLabel.setAttribute('for', `quantity-${itemCount}`)
  amountLabel.appendChild(document.createTextNode("Amount:"))
  amount.setAttribute('name', `quantity-${itemCount}`)
  amount.setAttribute('type', 'number')
  amount.setAttribute('min', '0')
  amount.setAttribute('placeholder', '1000')

  itemCount++;

  items.forEach((item) => {
    var option = document.createElement('option')
    option.value = item
    option.text = item

    select.appendChild(option)
  })

  orderform.appendChild(itemLabel)
  orderform.appendChild(select)

  orderform.appendChild(amountLabel)
  orderform.appendChild(amount)
}

if (orderform && addItem) {
  addItem.onclick = addFormField
}