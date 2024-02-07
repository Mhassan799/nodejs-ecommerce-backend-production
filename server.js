const express = require('express')
const app = express()
const cors = require("cors")
require('dotenv').config({path:'./config.env'})

port = process.env.PORT || 8080;
const connectDb = require('./db/db')

app.use(cors())

// routes 
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/ProductRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const promoRoutes = require('./routes/promoRouts')



// databse call 
connectDb();
// midlleware
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/promo',promoRoutes)


app.listen(port, ()=>{
    console.log(`server is runing on ${port}`)
})