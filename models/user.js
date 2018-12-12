const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const config=require('../config/database');

//user schema
const userSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    }

});
const User=mongoose.model('user',userSchema);
module.exports=User;

module.exports.addUser=function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
         bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            else{
            newUser.password=hash;
            newUser.save(callback);
            }
         });
    })
}


module.exports.getUserById=function(id,callback){
User.findById(id,callback);
}

module.exports.getUserByUsername=function(username,callback){
    const query={username:username};
    User.findOne(query,callback);
    }

module.exports.comparePassword=function(candidatepass,hash,callback){
    bcrypt.compare(candidatepass,hash,(err,isMatch)=>{
         if(err) throw err;
         callback(null,isMatch);
    });
}    