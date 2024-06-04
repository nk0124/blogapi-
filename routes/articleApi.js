const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('dotenv').config() 
mongoose.connect(process.env.MONGODB_URI);



const Article = require('../models/article')
const multer  = require('multer') // multer is used for upload the files

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
})

const upload = multer({
  storage: storage,
  limits: {    fileSize: 1024 * 1024 * 5     },
  fileFilter: (req, file, cb) => {
if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {                                
      cb(null, true);         
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }

})

// 8. all articles
router.get('/', (req, res) => {
  Article.find().then((data)=>{res.send(data)})
  })
  // 10 recent articles -> home page
  router.get('/recent/', (req, res) => {
    Article.find({hidden:false}).sort({_id:-1}).limit(6).then((data)=>{res.send(data)})
    })
    // 3. view 
  router.get('/:id', (req, res) => {
    Article.findOne({_id:req.params.id}).then((data)=>{res.send(data)})
    })
    // 2. user -> article
    router.get('/author/:author', (req, res) => {
      Article.find({author:req.params.author}).then((data)=>{res.send(data)})
      })

      // 11 categorywise-> blog page
    router.get('/category/:category', (req, res) => {
        Article.find({category:req.params.category,hidden:false}).then((data)=>{res.send(data)})
        })

      
          
      
    
  
   // 1. save -> user 
  router.post('/',upload.single('image'), (req, res) => {
    let img="http://localhost:3000/public/"+req.file.filename;
    const data  = new Article({ title:req.body.title,author:req.body.author,body:req.body.body,image:img,
    category:req.body.category});
    data.save().then(() => res.send({response:'Record Save'}));
})
  // 5. delete
  router.delete('/:id', (req, res) => {
  let id=req.params.id;
  Article.deleteOne({_id:id}).then((data)=>{res.send(data)})
  })
    
  // 9. status change 
  router.patch('/status/:id', (req, res) => {
    let id=req.params.id;
    Article.updateOne({_id:id},{hidden:req.body.hidden}).then((data)=>{res.send(data)})
    })
    // 4.update
    router.patch('/:id', (req, res) => {
      let id=req.params.id;
      Article.updateOne({_id:id},{title:req.body.title,body:req.body.body,category:req.body.category}).then((data)=>{res.send(data)})
      })
      // 7.image
      router.patch('/image/:id',upload.single('image'), (req, res) => {
        let id=req.params.id;
        let img="http://localhost:3000/public/"+req.file.filename;
        Article.updateOne({_id:id},{image:img}).then((data)=>{res.send(data)})   
        })
      
  
  module.exports=router;
  
  