require('dotenv').config()
const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const authRoute = require('./routes/authRoute')

const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

require('./config/passportConfig')

// console.log(process.env);
app.all('/', (req, res) => {
  res.json({status:'wheelz'})
})

app.all('/api', (req, res) => {
  res.json({status:'wheelz api'})
})

app.use('/api/auth',authRoute)


app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})