const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 5000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.all('/', (req, res) => {
  res.json({status:'wheelz'})
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})