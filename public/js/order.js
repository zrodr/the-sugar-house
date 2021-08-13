let itemCount = 1;

const orderList = document.querySelector('.item-list')
const firstItem = orderList.querySelector('select[name="item"]')
const firstAmount = orderList.querySelector('select[name="quantity"]')
const addItem = document.getElementById('add-item')
const removeItem = document.getElementById('remove-item')


/* adding event listeners */
if (orderList && firstItem && addItem && removeItem) {
  firstItem.onchange = getPricesForItem
  addItem.onclick = addFormField
  removeItem.onclick = removeFormField
}


function addFormField(e) {
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
  /* set all options to invisible when spawning new quantity select */
  amountSelect.querySelectorAll('option[style*="block"]').forEach((option) => { 
    option.style.display = 'none' 
  })

  itemCount++;

  orderList.appendChild(newItem)
  orderList.appendChild(newAmount)
}

function removeFormField(e) {
  e.preventDefault()

  if (itemCount === 1) return;

  const removeNode = (node) => {
    while (node.firstChild) {
      node.removeChild(node.firstChild)
    }
  
    orderList.removeChild(node)
  }

  const lastAmount = orderList.lastChild
  const lastItem = lastAmount.previousElementSibling
  itemCount--;

  removeNode(lastItem)
  removeNode(lastAmount)
}

/* called on item field once a selection is made */
function getPricesForItem(e) {
  e.preventDefault()

  const filterPrices = (item) => {
    const prices = nextAmount.querySelectorAll(`:not(option[class*="${item}"])`)
    prices.forEach((price) => {
      price.style.display = 'none'
    })
  }

  /* grabs the quantity field corresponding to the item select tag */
  const nextAmount = this.parentElement.nextElementSibling.querySelector('select[name*="quantity"]')
  const allPrices = nextAmount.querySelectorAll('option[class*="prices"]')
  const itemName = this.value

  /* reset all fields before filtering them out again */
  allPrices.forEach((price) => { price.style.display = 'block' })
  nextAmount.selectedIndex = 0

  if (itemName.includes('Cookies')) {
    filterPrices('cookie')
  }
  else if (itemName.includes('Cupcakes')) {
    filterPrices('cupcake')
  }
  else {
    filterPrices('9-inch')
  }
}