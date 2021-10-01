const path = require('path')

const express = require('express')
const helmet = require('helmet')
const exphbs = require('express-handlebars')
const session = require('express-session')
const connectToDB = require('./config/db')

require('dotenv').config()

const connection = connectToDB()

const app = express()

if(app.get('env') === 'production') {
  app.set('trust proxy', 1) // for planned nginx reverse proxy
  //session.cookie.secure = true
}

/* allows express to serve static files from a specified directory */
app.use(session({secret: process.env.SECRET, resave: false, saveUninitialized: false }))
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

/* mounting routes */
app.use(connection)
app.use('/', require('./routes/index'))
app.use('/order', require('./routes/placeorder'))

/* For errors thrown from routes */
app.use((err, req, res, next) => {
  res.status(500).render('error', { 
    cssPath: "/css/error.css", 
    message: err.message,
    code: 500 
  })
})

/* Not found errors */
app.use((req, res, next) => {
  res.status(404).render('error', {
    cssPath: "/css/error.css", 
    message: "Page not found.",
    code: 404 
  })  
})

const port = process.env.PORT
app.listen(port)