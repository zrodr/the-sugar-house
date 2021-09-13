const path = require('path')

const express = require('express')
const helmet = require('helmet')
const exphbs = require('express-handlebars')
const connectToDB = require('./config/db')

require('dotenv').config()

connectToDB()

const indexRouter = require('./routes/index')
const orderRouter = require('./routes/placeorder')

const app = express()

/* allows express to serve static files from a specified directory */
app.use(express.static(path.join(__dirname, '/public')))
app.use(helmet())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/* setting up and configuring handlebar view engine */
app.set('view engine', 'hbs')
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials')
  })
  )
  
  app.use('/', indexRouter)
  app.use('/order', orderRouter)
  app.use((err, req, res, next) => {
    res.status(500).render('error', { message: err.message })
  })
  
  const port = process.env.PORT
  app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})