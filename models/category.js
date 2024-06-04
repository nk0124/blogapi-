
const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: {type: String,required:true},
  icon: {type: String,required:true},
 });
 module.exports = mongoose.model('Category',categorySchema ,'Category');



