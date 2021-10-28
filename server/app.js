const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({path:"./config.env"});
const PORT=process.env.PORT;

//DB conn

require("./db/conn");

app.use(express.json());
//MiddleWare for router

app.use(require('./routers/auth'));

const middleware=(req,res,next)=>{
console.log("Middleware Activated!!");
next();
}

app.get('/',(req,res)=>{
res.send("Hello world from Homepage/ server");
});

app.get('/about',middleware,(req,res)=>{
console.log("About Activated!!");
res.cookie("testJWT","about-cookie");
res.send("Hello from ABOUT");
});

app.get('/contacts',(req,res)=>{
res.send("Hello world from CONTACTS");
});

app.get('/register',(req,res)=>{
res.send("Hello world from SIGNUP");
});


app.get('/login',(req,res)=>{
res.send("Hello world from LOGIN");
});


app.get('/logout',(req,res)=>{
res.send("Hello world from LOGOUT");
});

// to understand origin 
app.listen(PORT,()=>{
console.log(`Server running at port ${PORT}`);

});
