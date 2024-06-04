
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {type: String,required:true},
  lastName: {type: String,required:true},
  emailId: {type: String,required:true},
  password:{type:Number,required:true},
  phoneNo:{type:String,default:null},
  about:{type:String,default:null},
  city: {type: String,default:null},
  state: {type: String,default:null},
  gender:{type:String,default:null},
  dob:{type:Date,default:null},
  hidden:{type:Boolean,default:true},
  date: {type: Date, default: Date.now }
});

 module.exports = mongoose.model('User',userSchema ,'User');



