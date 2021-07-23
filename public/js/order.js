var itemCount = 1;
const orderform = document.getElementById('order-form')
const addItem = document.getElementById('add-item')
const removeItem = document.getElementById('remove-item')

const createDefaultOption = (optionText) => {
  const defaultOption = document.createElement('option')
  defaultOption.setAttribute('hidden', '')
  defaultOption.setAttribute('disabled', '')
  defaultOption.setAttribute('selected', '')
  defaultOption.appendChild(document.createTextNode(optionText))

  return defaultOption
}

const createItemField = (items) => {
  const formGroup = document.createElement('div')
  formGroup.setAttribute('class', 'form-group')

  const itemLabel = document.createElement('label')
  const select = document.createElement('select')

  itemLabel.setAttribute('for', `item-${itemCount}`)
  itemLabel.appendChild(document.createTextNode("Item:"))

  select.setAttribute('name', `item-${itemCount}`)
  select.required = true

  select.appendChild(createDefaultOption('Select an item'))
  items.forEach((item) => {
    var option = document.createElement('option')
    option.value = item
    option.text = item

    select.appendChild(option)
  })

  formGroup.appendChild(itemLabel)
  formGroup.appendChild(select)

  return formGroup
}

const createAmountField = (amounts) => {
  const formGroup = document.createElement('div')
  formGroup.setAttribute('class', 'form-group')

  const amountLabel = document.createElement('label')
  const amount = document.createElement('select')

  amountLabel.setAttribute('for', `quantity-${itemCount}`)
  amountLabel.appendChild(document.createTextNode("Amount:"))

  amount.setAttribute('name', `quantity-${itemCount}`)
  amount.required = true

  amount.appendChild(createDefaultOption('1,000 :)'))
  amounts.forEach((count) => {
    var option = document.createElement('option')
    option.value = count
    option.text = count

    amount.appendChild(option)
  })

  formGroup.appendChild(amountLabel)
  formGroup.appendChild(amount)

  return formGroup
}

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

  const amounts = [
    "1 (Brownies/Cakes)",
    "6",
    "12"
  ]

  const itemGroup = createItemField(items)
  const amountGroup = createAmountField(amounts)

  itemCount++;

  orderform.insertBefore(itemGroup, addItem)
  orderform.insertBefore(amountGroup, addItem)
}

const removeNode = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }

  orderform.removeChild(node)
}

const removeFormField = (e) => {
  e.preventDefault()
  if (itemCount === 1) return;

  const lastAmount = addItem.previousElementSibling
  const lastItem = lastAmount.previousElementSibling
  itemCount--;

  removeNode(lastItem)
  removeNode(lastAmount)
}

if (orderform && addItem && removeItem) {
  addItem.onclick = addFormField
  removeItem.onclick = removeFormField
}