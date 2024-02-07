const CategoryModel = require('./categoryModel')
var mongoose = require('mongoose')
var    slug = require('mongoose-slug-updater')

    mongoose.plugin(slug)

 var Schema = mongoose.Schema,

 productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    slug: { type: String, slug: "name" },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
        
       
    },
    dislikes:{
        type:Number,
        default:0
       
    },

    views:{
        type:Number,
       
    },
    color:{
        type:Array,
        default:[]
       
    },
    size:{
        type:String,
        enum:['small','medium','large']
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryModel',
        required:true
    },
    status:{
        type:String,
        enum:['active', 'inactive'],
    },
    material:{
        type:Array,
        default:[]
    },
    
   
})

module.exports = mongoose.model('products',productSchema)