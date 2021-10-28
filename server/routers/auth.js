const express = require('express');
const bcrypt = require('bcryptjs');
const { collection } = require('../models/userSchema');
const router = express.Router();

//importiing DB CONN
require("../db/conn");

// importing collection schema
const User =require("../models/userSchema");
const { json } = require('express');

//calling Homepage
router.get('/',(req,res)=>{


    res.send("Calling Home via router/auth.js !!");

});


//register route using ASYNC AWAIT
router.post('/register',async (req,res)=>{

    //es6
    const {name,email,phone,work,password,cpassword} = req.body;

    //validations
    if(!name && !email && !phone && !work && !password && !cpassword){
        // console.log(json(name));
        return res.status(422).json({error:"Please Fill All fields!!"});
        // return res.json({
        //     "NAME": name,
        //     "EMAIL":email,
        //     "PHONE":phone,
        //     "WORK":work,
        //     "PASS":password,
        //     "CPASS":cpassword
        // });
    }

    // checking if user is already register

    try{
        const userExist = await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"User already Exist!!"});
        }
        else if(password!=cpassword){
            return res.status(422).json({error:"password doesnst match!"})
        }
        else{
            const user = new User({name,email,phone,work,password,cpassword});
            const saveVerify =await user.save();
            return res.status(201).json({error:"User register Successfully!!"});
        }

    }
    catch(err){
            console.log(err);
    }
});


//using PROMISES .then()
// router.post('/register',(req,res)=>{

//     //es6
//     const {name,email,phone,work,password,cpassword} = req.body;

//     //validations
//     if(!name || !email || !phone || !work || !password || !cpassword){

//         return res.status(422).json({error:"Please Fill All fields!!"});
//     }

//     // checking if user is already register
//     User.findOne({
//         email:email
//     }).then((userExist)=>{
//         //if user exist
//             if(userExist){
//                 return res.status(422).json({error:"User already Exist!!"});
//             }
//             // new user
//             const user = new User({name,email,phone,work,password,cpassword});

//             //save to DB
//             user.save().then(()=>{

//                 res.status(201).json({message:"User Registered Successfully!!"});

//             }).catch((err)=>{
//                 res.status(500).json({error:"Failed to register!"});
//             });

            
//     }).catch((err)=>{
//             console.log(err);
//     });

// });

//login route

router.post('/signin',async (req,res)=>{
   
    try{
        const {email ,password}=req.body;

        if(!email || !password){
            return res.status(400).json({error:"All fields are required!!"});
        }

        const userLogin = await User.findOne({email:email});
       //is user registered
        if(userLogin){
            // comparing password
            const match = await bcrypt.compare(password,userLogin.password);

            //auth jwt calling genauth func
            const token = await userLogin.generateAuthToken();

            //storing token in cookies
            res.cookie('jwtoken',token,{
                //expires/logout after 30 days
                expires:new Date(Date.now() + 25892000000),
                //can also run on unsecure pages
                httpOnly:true,
            });

            if(!match){
                res.status(400).json({error:"Invalid Password!!"});
            }
            else{
                res.json({message:"Logged in Successfully!!"});
            }
        }
        else{
            res.status(400).json({error:"Error!!"});
        }


    }
    catch(err){
        console.log(err);
    }

});

module.exports = router; 
