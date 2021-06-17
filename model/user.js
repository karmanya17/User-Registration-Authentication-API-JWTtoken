const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
  username:{ type:String,require:true,unique:true},
  password:{ type:String,require:true}
},
{collection:"user"}
);
const model=mongoose.model("UserSchema",userSchema);
module.exports=model;
