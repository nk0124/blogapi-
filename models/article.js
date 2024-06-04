
const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {type: String,required:true},
  author: {type: String,required:true},
  category:{type: String,required:true},
  body: {type: String,required:true},
  image: {type: String,required:true},
  date: { type: Date, default: Date.now },
  hidden:{type:Boolean,default:true} 
});
 module.exports = mongoose.model('Article',articleSchema ,'Article');



