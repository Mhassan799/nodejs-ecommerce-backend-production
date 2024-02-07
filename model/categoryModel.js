var mongoose = require('mongoose')
var    slug = require('mongoose-slug-updater')

    mongoose.plugin(slug)

 var Schema = mongoose.Schema,
categorySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    slug: { type: String, slug: "name" },
    status: {
        type: String,
        enum:['active', 'inactive'], 
        required: true
    }
})

module.exports = mongoose.model('category',categorySchema)