var mongoose = require('mongoose')
var    slug = require('mongoose-slug-updater')

    mongoose.plugin(slug)

 var Schema = mongoose.Schema,

 orderSchema = new Schema({
    products:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'cart',
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    slug: { type: String, slug: "username" },
    
    contact:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        
    },
    total:{
        type:Number,
        
    },
    paymentMethod:{
        type:String,
        enum:['COD','Online'],
        required:true,
    },
    totalAfterDiscount:{
        type:Number
    },
})

module.exports= mongoose.model('order',orderSchema )