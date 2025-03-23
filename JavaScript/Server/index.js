const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extented: true }))

//enable cors
app.use(cors())

//register route
require('./src/route')(app);

app.listen(3001)
console.log('Rest API running at http://localhost:3001/');