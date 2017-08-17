var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new mongoose.Schema({
  name: {type: String},
  password: {type: String},
  selling: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  buying: [{type: Schema.Types.ObjectId, ref: 'Product'}]
}, {timestamps: true})

var ProductSchema = new mongoose.Schema({
  title: {type: String},
  description: {type: String},
  price: {type: String},
  _seller: {type: Schema.Types.ObjectId, ref: 'User'},
  _buyer: {type: Schema.Types.ObjectId, ref: 'User'},
  category: {
    type: String,
    enum: ['Electronics', 'Books', 'Home', 'Fashion', 'Others'],
    trim: true,
    default: 'Others'
  }
}, {timestamps: true})

mongoose.model('User', UserSchema)
mongoose.model('Product', ProductSchema)
