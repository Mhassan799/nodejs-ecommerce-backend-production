const Product = require('./productModel')
var mongoose = require('mongoose')
var    slug = require('mongoose-slug-updater')

    mongoose.plugin(slug)

 var Schema = mongoose.Schema,

cartSchema = new Schema({

    productId:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'products',
       required:true
    },
    username:{
        type:String,
        required:true
    },
    slug: { type: String, slug: "username" },
    quantity:{
        type:Number,
        // required:true
        default:1
    },
    total:{
        type:Number,
        
    },
    price:{
        type:Number
        
    }
})

module.exports = mongoose.model('cart', cartSchema)