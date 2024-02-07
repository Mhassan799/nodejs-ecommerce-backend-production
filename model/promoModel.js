var mongoose = require('mongoose')
var    slug = require('mongoose-slug-updater')

    mongoose.plugin(slug)

 var Schema = mongoose.Schema,
 promoCodeSchema = new Schema({
  promoCode: {
    type: String,
    required: true,
    unique: true,
  },
  slug: { type: String, slug: "promoCode" },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  percentageDiscount: {
    type: Number,
    required: true,
  },
  maxDiscountAmount: {
    type: Number,
    default: 300,
  },
  users:{
    type :Array,
    default:[]
  },

});


module.exports= mongoose.model('promoCode',promoCodeSchema )