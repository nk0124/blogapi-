const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/blogDB');
const Category = require('../models/category')

router.get('/', (req, res) => {
  Category.find().then((data)=>{res.send(data)})
  })
  router.post('/', (req, res) => {
    const data  = new Category({ title:req.body.title,icon:req.body.icon});
    data.save().then(() => res.send({response:'Record Save'}));
})
  router.delete('/:id', (req, res) => {
  let id=req.params.id;
  Category.deleteOne({_id:id}).then((data)=>{

    if(data.acknowledged==true && data.deletedCount==1)
    res.send({response :'Record Deleted'})

  })
})

  module.exports=router;

   