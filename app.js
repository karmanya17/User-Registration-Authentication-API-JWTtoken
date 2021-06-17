const express=require("express");
const path=require("path");
const app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const user=require("./model/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

mongoose.connect("mongodb://localhost:27017/login-app-db");

app.use("/",express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());
const jwt_secret="asdfghjkl";

app.post("/api/login",async(req,res)=>{
  const{username,password}=req.body;

  const userdata=await user.findOne({username}).lean();
  if(!userdata){
    return res.json({status:"error",error:"invalid username/password"});
  }
  if(await bcrypt.compare(password,userdata.password)){
    const token=jwt.sign({
      id:userdata._id,
      username:userdata.username
    },jwt_secret
  )

    return res.json({status:"ok",data:token});


  }

  res.json({status:"error",error:"invalid username/password"});
});
app.post('/api/register',async(req,res)=>{
  console.log(req.body);
  const{username,password:plainTextPassword}=req.body;
  const password=await bcrypt.hash(plainTextPassword,10);
  if(!username || typeof username !=="string"){
    return res.json({status:error});
  }
  if(plainTextPassword.length<5){
    return res.json({status:"error",error:"password show have atleast 5 characters"});
  }
  try{
  const response=await user.create({
    username,
    password
  })
  console.log("user created Successfully:",response);
  }catch(error){
    console.log(error)
    return res.json({status:"error"});
  }
  res.json({status:"ok"});
})


app.listen(3000,function(){
  console.log("server is up at port 3000");
});
