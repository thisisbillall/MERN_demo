import React, { useState ,useHistory} from "react";

const SingUp = () => {
    // const history = useHistory();

    const[user,setUser]  = useState({
            name: "",
            email:"",
            phone:"",
            work:"",
            password:"",
            cpassword:"",
    });

    let name,value;
    const changeHandler=(e)=>{
        name = e.target.name;
        value= e.target.value;
        setUser({...user,[name]:value});
        console.log(e);
    };

    const postData = async(e)=>{
       
        e.prevenDefault();
        const {name,email,phone,work,password,cpassword} = user;

        const res =  await fetch("/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                work: work,
                password:password,
                cpassword:cpassword,
            })
        });

        const data =await res.json();

        if(data.status===422 || !data){
            alert("REGISTRATION FAILED");
            console.log("REGISTRATION FAILED");
            
        }
        else{
        alert("REGISTRATION  SUCCESSFULL!");
            console.log("REGISTRATION SUCCESSFULL");
            // history.push("/login");
        }

    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form className="register-form" id="register-form" method="POST">

            <div className="txt-box mt-5">
                <lable htmlFor="name">
                    <i className="zmdi zmdi-account"></i>
                </lable>
                <input type="text" id="name" name="name" autoComplete="off" placeholder="Your Name"
                value={user.name}
                onChange={changeHandler}
                />
            </div>
                

            <div className="txt-box mt-3">
                
            <lable htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
                </lable>
                <input type="email" id="email" name="email" autoComplete="off" placeholder="Your Email"
                 value={user.email}
                 onChange={changeHandler}/>

            </div>

            <div className="txt-box mt-3">
            <lable htmlFor="phone">
                    <i className="zmdi zmdi-phone"></i>
                </lable>
                <input type="tel" id="phone" name="phone" autoComplete="off" placeholder="Your phone"
                 value={user.phone}
                 onChange={changeHandler}/>

                </div>


                <div className="txt-box mt-3">
            <lable htmlFor="work">
                    <i className="zmdi zmdi-slideshow"></i>
                </lable>
                <input type="text" id="work" name="work" autoComplete="off" placeholder="Your Profession"
                 value={user.work}
                 onChange={changeHandler}/>

                </div>


            <div className="txt-box mt-3">
                
            <lable htmlFor="apassword">
                    <i className="zmdi zmdi-lock"></i>
                </lable>
                <input type="password" id="password" name="password" autoComplete="off" placeholder="Your Password"
                 value={user.password}
                 onChange={changeHandler}/>

            </div>

            <div className="txt-box mt-3">
            <lable htmlFor="cpassword">
                    <i className="zmdi zmdi-lock"></i>
                </lable>
                <input type="password" id="cpassword" name="cpassword" autoComplete="off" placeholder="Confirm Password"
                 value={user.cpassword}
                 onChange={changeHandler}/>
            </div>

            <div className="txt-box mt-3">
                <input  type="submit" id="signup" name="signup" className="form-submit" value="register"
                    onClick={postData}
                />
            </div>
            </form>
        </div>
    );
}

export default SingUp;