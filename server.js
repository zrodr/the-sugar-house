const path = require('path')

const express = require('express')
const helmet = require('helmet')
const exphbs = require('express-handlebars')

require('dotenv').config()
const port = process.env.PORT

require('./db/db')

const indexRouter = require('./routes/index')
const adminRouter = require('./routes/admin')

const app = express()
/* allows express to serve static files from a specified directory */
app.use(express.static(path.join(__dirname, '/public')))
app.use(helmet())
app.use(express.urlencoded({ extended: true }))

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

/* mounting routers */
app.use('/', indexRouter)
app.use('/admin', adminRouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})