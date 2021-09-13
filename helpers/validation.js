const validateFields = (fields) => {
  fields.forEach((field) => {
    field = field.trim()
    if(!field) {
      return false //ensures no blank data can be sent
    }
  })

  return true
}

module.exports = { validateFields }