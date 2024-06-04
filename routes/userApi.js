const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('dotenv').config() 
mongoose.connect(process.env.MONGODB_URI);

const User = require('../models/user')
const nodemailer = require("nodemailer");


router.get('/', (req, res) => {
  User.find().then((data)=>{res.send(data)})
  })

  router.post('/', (req, res) => {
    const data  = new User({ firstName:req.body.firstName,lastName:req.body.lastName,emailId:req.body.emailId,
    password:req.body.password,phoneNo:req.body.phoneNo});
    data.save().then(() => {
      main({ firstName:req.body.firstName,emailId:req.body.emailId}).catch(console.error);      
      res.send({response:'Account Created',success:true})});
})

router.post('/login', async(req, res) => {
  let user=await User.findOne({emailId:req.body.emailId}); 
  if( !user)
  res.send({response:'Invalid Email address',success:false})
  else{
    if(user.password==req.body.password)
    res.send({response:"Login Successful",userid:user._id,success:true})
    else
    res.send({response:'Invalid Password',success:false})
  }
   

})

router.get('/:id', (req, res) => {
  User.findOne({_id:req.params.id}).then((data)=>{res.send(data)})
  })

      router.patch('/:id', (req, res) => {
      let id=req.params.id;
      let rb=req.body;
      User.updateOne({_id:id},{firstName:rb.firstName,lastName:rb.lastName,phoneNo:rb.phoneNo,
        state:rb.state,city:rb.city,gender:rb.gender,dob:rb.dob}).then((data)=>{res.send(data)})
      })
      router.patch('/pwd/:id', (req, res) => {
        let id=req.params.id;
        User.updateOne({_id:id},{password:req.body.password}).then((data)=>{res.send(data)})
        })

        router.patch('/pwdreset/:emailId', (req, res) => {
          console.log(req.params)
          console.log(req.body)
          let emailId=req.params.emailId;
          User.updateOne({emailId:emailId},{password:req.body.password}).then((data)=>{
            if(data.acknowledged)
            res.send({response:"password updated",success:true})
            else{
              res.send({response:"error in code",success:false})
            }
          })
          })
    
          router.post('/forgot', async(req, res) => {
            let user=await User.findOne({emailId:req.body.emailId}); 
            if( !user)
            res.send({response:'Invalid Address',success:false})
            else{
           
              pwdmail({ firstName:user.firstName,emailId:req.body.emailId,code:req.body.code}).catch(console.error);      
              res.send({response:'Mail Sent',success:true})}})
              
  
  
  
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465, //587
          secure: true,
          auth: {
            user: "neetakumari7488@gmail.com",
            pass: "cdqsyyzyshvwpxbh",
          },
        });
        
        async function main(data) {
          // send mail with defined transport object
          const info = await transporter.sendMail({
            from: '"Writers Blog" <neetakumari7488@gmail.com>', // sender address
            to: data.emailId, // list of receivers
            subject: "Welcome To Writers Blog", // Subject line
            html: "<b>Hi "+data.firstName+"</b><p> Happy To Have You !</p><p> Share Your Stories, Thoghts & ideas </p><br> <h3> Regards Writers blog Team</h3>", // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          }
          async function pwdmail(data) {
            // send mail with defined transport object
            const info = await transporter.sendMail({
              from: '"Writers Blog" <neetakumari7488@gmail.com>', // sender address
              to: data.emailId, // list of receivers
              subject: "Password Recovery", // Subject line
              html: `<h2>Hi ${data.firstName} </h2> <p>You have just requested a password reset for the account
              associated with this email address.To reset your password
              Use the code given below .If this is a mistake just ignore this email - your password will
              not be changed.</p>
              <h3>Your Verification code is ${data.code}.</h3><br>
              <h5>Regards writer Blog</h5>`});

          
            console.log("Message sent: %s", info.messageId);
            }
    
  
  
        module.exports=router;
  



