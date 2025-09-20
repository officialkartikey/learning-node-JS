const express = require('express');
const app =express();
const userModel = require('./usermodel');

app.get('/',(req,res) =>{
    res.send("hey");
})

app.put('/create', async (req,res) =>{
  let createduser = await userModel.create({
    name:"kartikey",
    email:"kartikey@gmail.com",
    username:"kartikey"
   }) 
   res.send(createduser);
})
app.POST('/update', async (req,res) =>{
  
   let updateduser=await userModel.findOneAndUpdate({username:"kartikey"},{name:"kartikey mishra"},{new:true})
   res.send(updateduser);
})

app.get('/read', async (req,res) =>{
  
   let user=await userModel.find({username:"kartikey"})
   res.send(user);
})
app.DELETE('/delete', async (req,res) =>{
  
   let deleteduser=await userModel.find({username:"kartikey"},{name:"kartikey mishra"},{new:true})
   res.send(deleteduser);
})
app.listen(3000);