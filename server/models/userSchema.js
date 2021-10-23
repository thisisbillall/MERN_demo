const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },

    email:{
        type:String,
        require:true,
    },

    phone:{
        type:Number,
        require:true,
    },

    work:{
        type:String,
        require:true,
    },

    password:{
        type:String,
        require:true,
    },

    cpassword:{
        type:String,
        require:true,
    },

 
})
//creating model

const User = mongoose.model('USER',userSchema);
module.exports = User;