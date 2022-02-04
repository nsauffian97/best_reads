/*
server.js

This is our Server

*/
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
// Set up to use Express webservice and ejs layout
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

/*
View Engine: responsible for creating HTML from views. It renders our views and convert code into HTML
EJS (Embedded Javascript): Templating language that allows us to generate HTML with plain JS.
*/ 

// Setting the view engine to 'ejs'.
app.set('view engine', 'ejs')
// Setting up to grab all the views from the views folder
app.set('views', __dirname + '/views')
// Setting up the layout - all of the additional html will be placed within this layout so that we don't have to repeat boilerplate code
app.set('layout', 'layouts/layout')

// Telling the app that we will be using expressLayouts
app.use(expressLayouts)
// Telling the app where our public folder will be (stylesheets, images, javascripts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewURLParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors',authorRouter)

// Telling up to listen to a certain port
app.listen(process.env.PORT || 3000)
 
