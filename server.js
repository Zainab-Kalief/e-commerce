var express = require('express')
var body_parser = require('body-parser')
var path = require('path')
var session = require('express-session')
var app = express()
app.use(body_parser.json())
app.use(session({secret: 'God is the only key', resave: true, saveUninitialized: true}))
app.use(express.static(path.join(__dirname, './client/dist')))


require('./server/config/mongoose.js')
require('./server/config/routes.js')(app)


app.listen(8000)
