
const express = require('express')
const bodyParser = require('body-parser')
var cors =require('cors')
require('dotenv').config() 

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(cors({origin: '*'}))
app.use('/public', express.static('public'));

const port = process.env.PORT
const categoryApi=require('./routes/categoryApi')
const articleApi=require('./routes/articleApi')
const userApi=require('./routes/userApi')
const adminApi=require('./routes/adminApi')


app.use('/category',categoryApi)
app.use('/article',articleApi)
app.use('/user',userApi)
app.use('/admin',adminApi)



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})