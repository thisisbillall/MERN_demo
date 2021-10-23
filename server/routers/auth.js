const express = require('express');
const { collection } = require('../models/userSchema');
const router = express.Router();

//importiing DB CONN
require("../db/conn");

// importing collection schema
const User =require("../models/userSchema");

//calling Homepage
router.get('/',(req,res)=>{


    res.send("Calling Home via router/auth.js !!");

});


router.post('/register',(req,res)=>{

    //es6
    const {name,email,phone,work,password,cpassword} = req.body;

    //validations
    if(!name || !email || !phone || !work || !password || !cpassword){

        return res.status(422).json({error:"Please Fill All fields!!"});
    }

    // checking if user is already register
    User.findOne({
        email:email
    }).then((userExist)=>{
        //if user exist
            if(userExist){
                return res.status(422).json({error:"User already Exist!!"});
            }
            // new user
            const user = new User({name,email,phone,work,password,cpassword});

            //save to DB
            user.save().then(()=>{

                res.status(201).json({message:"User Registered Successfully!!"});

            }).catch((err)=>{
                res.status(500).json({error:"Failed to register!"});
            });

            
    }).catch((err)=>{
            console.log(err);
    });

});
module.exports = router; 