var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const db = require('./db')

const ROUTES = require('./routes')
const API = require('./api')

app.use(express.static('build'))
app.use(bodyParser.json())

app.listen(4000, function () {})

app.post(ROUTES.NEAR, API.NEAR)
