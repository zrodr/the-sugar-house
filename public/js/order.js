var itemCount = 1;

const orderList = document.querySelector('.item-list')
const firstItem = orderList.querySelector('select[name="item"]')
const addItem = document.getElementById('add-item')
const removeItem = document.getElementById('remove-item')

const addFormField = (e) => {
  e.preventDefault()

  /* copy DOM subtrees for input fields. 'for' and 'name' attributes are appended
     with a numeric constant to maintain uniqueness */
  const newItem = orderList.firstElementChild.cloneNode(true)
  const newAmount = orderList.firstElementChild.nextElementSibling.cloneNode(true)

  newItem.querySelector('label[for*="item"]').htmlFor = `item-${itemCount}`
  const itemSelect = newItem.querySelector('select[name*="item"]')
  itemSelect.name = `item-${itemCount}`
  itemSelect.onchange = getPricesForItem

  newAmount.querySelector('label[for*="quantity"]').htmlFor = `quantity-${itemCount}`
  const amountSelect = newAmount.querySelector('select[name*="quantity"]')
  amountSelect.name = `quantity-${itemCount}`

  itemCount++;

  orderList.appendChild(newItem)
  orderList.appendChild(newAmount)
}

const removeFormField = (e) => {
  e.preventDefault()
  if (itemCount === 1) return;

  const lastAmount = orderList.lastChild
  const lastItem = lastAmount.previousElementSibling
  itemCount--;

  removeNode(lastItem)
  removeNode(lastAmount)
}

if (orderList && firstItem && addItem && removeItem) {
  firstItem.onchange = getPricesForItem
  addItem.onclick = addFormField
  removeItem.onclick = removeFormField
}


/*  helper functions */
function removeNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }

  orderList.removeChild(node)
}

function getPricesForItem(e) {
  e.preventDefault()

  const itemName = this.value
  /* grabs the quantity field corresponding to the item select tag */
  const nextAmount = this.parentElement.nextElementSibling.querySelector('select[name*="quantity"]')

  if (itemName.includes('Cookies')) {
    console.log(nextAmount.options)
  }
  console.log(itemName)
}