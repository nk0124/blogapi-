const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require('dotenv').config() 
mongoose.connect(process.env.MONGODB_URI);
const Admin = require('../models/admin')

router.post('/', (req, res) => {
  const data  = new Admin({ emailId:req.body.emailId,
  password:req.body.password});
  data.save().then(() => {
     res.send('Record Save')});
})

router.post('/login', async(req, res) => {
let admin=await Admin.findOne({emailId:req.body.emailId}); 
if( !admin)
res.send({response:'invalid address'})
else{
  if(admin.password==req.body.password)
  res.send({response:"login successful",adminid:admin._id,success:true})
  else
  res.send({response:'invalid password'})
}     
})
  module.exports=router;
