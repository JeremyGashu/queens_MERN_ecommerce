const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const cookieParser = require('cookie-parser')

const itemsRoute = require('./api/routes/items')
const reviewRoute = require('./api/routes/reviews')
const categoryRoute = require('./api/routes/catagories')
const discountRoute = require('./api/routes/discounts')
const orderRoute = require('./api/routes/orders')
const adminRoute = require('./api/routes/admins')


mongoose.connect('mongodb://localhost/queens_project', {useCreateIndex : true,useNewUrlParser : true, useUnifiedTopology : true})

let db = mongoose.connection

db.once('open', () => {
    console.log('Database Connected')
})
db.on('error', err => {
    if (err) throw err;
    console.log(err)  
})

const app = express()

app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use('/items', itemsRoute) 

app.use('/discounts', discountRoute)

app.use('/categories', categoryRoute)

app.use('/reviews', reviewRoute)

app.use('/orders', orderRoute)

app.use('/admins', adminRoute)

app.use((req, res) => {
    res.status(404).json({error:'Page Not Found'})
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server Running on Port : ${PORT}`)
})