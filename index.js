const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const cookieParser = require('cookie-parser')

const itemsRoute = require('./api/routes/items')
const reviewRoute = require('./api/routes/reviews')
const categoryRoute = require('./api/routes/catagories')
const discountRoute = require('./api/routes/discounts')
const orderRoute = require('./api/routes/orders')
const adminRoute = require('./api/routes/admins')

let devurl = 'mongodb://localhost/queens_project'
let prourl = 'mongodb+srv://ermias123:ermias123@cluster0.bxdjv.mongodb.net/queens_project?retryWrites=true&w=majority'

mongoose.connect(prourl, {useCreateIndex : true,useNewUrlParser : true, useUnifiedTopology : true})

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
app.use(cors())
app.use('/uploads',express.static('./assets/images/uploads'))
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use('/items', itemsRoute)

app.use('/discounts', discountRoute)

app.use('/categories', categoryRoute)

app.use('/reviews', reviewRoute)

app.use('/orders', orderRoute)

app.use('/admins', adminRoute)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})


app.use((req, res) => {
    res.status(200).json(
        {
            routes : ['/admins', '/categories', '/discounts', '/items', '/reviews', 'orders'],
            authors : 'Ermias Gashu and Nebiyu'
        }
    )
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server Running on Port : ${PORT}`)
})