import React,{ useState } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom'
import axios from 'axios';
import {Form} from 'semantic-ui-react'


function Login() {
    // login
    const [loginEmail,setLoginEmail] = useState("")
    const [loginPassword,setLoginPassword] = useState("")

    // registration
    const [registerEmail,setRegisterEmail] = useState("")
    const [registerPassword,setRegisterPassword] = useState("")
    const [registerConfirmPassword,setRegisterCfmPassword] = useState("")
    const [mode,setMode] = useState("login")
    //user type either be seeker or owner
    const [userType,setUserType] = useState("seeker") 

    //user type is owner
    const [companyName, setCompanyName] = useState("")

    function submitLogin(){
        
        // console.log("done")
        console.log(loginEmail)
        console.log(loginPassword)
        axios.post("http://127.0.0.1:5000/login",{loginEmail,loginPassword}).then(
            res =>{
                // console.log(res)
                console.log(res.data)
                
            }
        )
    }
    function submitRegistration(){
        if (userType == "owner"){
            axios.post("http://127.0.0.1:5000/register",{registerEmail,registerPassword,
            registerConfirmPassword,userType,companyName}).then(
                res =>{
                    // console.log(res)
                    console.log(res.data)
                    removeLoginDetails()
                }
            )
        }
        else{
            axios.post("http://127.0.0.1:5000/register",{registerEmail,registerPassword,registerConfirmPassword,userType}).then(
                res =>{
                    // console.log(res)
                    console.log(res.data)
                    removeRegisterDetails()
                }
            )
            
        }
        
    }
    function removeRegisterDetails(){
        setRegisterEmail("")
        setRegisterPassword("")
        setRegisterCfmPassword("")
        setCompanyName("")
    }
    function removeLoginDetails(){
        setLoginEmail("")
        setLoginPassword("")
    }
    function toggleMode(){
        if( mode === "login"){
            removeLoginDetails()
            setMode("register")

        }
        else{
            removeRegisterDetails()
            setMode("login")

        }
    }
    return (

        <div className="container">
                    { mode == "login" ? 
    
    
        <div className = "card justify-content-center" >
            <h2>Login</h2>
            <div className='input-group'>

            </div>
            <label className='label'>
                Email:
            </label>
            <input
            className='form-control'
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            type = "email" placeholder = "Email"></input>

            <label className='label'>
                Password:
            </label>
            <input
            className='form-control'
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            type = "Password" placeholder = "Password"
            
            ></input>
                <button className = "btn btn-primary"
                onClick={ submitLogin}>
                    Login
                </button>
            <label>Don't have an account? <a 
            onClick={toggleMode}>Register</a></label>

        </div>

    :

    <div className = "card justify-content-center" >
        <h2>Register</h2>
        <div className='input-group'>

        </div>
        <label className='label'>
            Email:
        </label>
        <input
        className='form-control'
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
        type = "email" placeholder = "Email"></input>

        <label className='label'>
            Password:
        </label>
        <input
        className='form-control'
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
        type = "Password" placeholder = "Password"
        
        ></input>
        <label className='label'>
            Confirm Password:
        </label>
        <input
        className='form-control'
        value={registerConfirmPassword}
        onChange={(e) => setRegisterCfmPassword(e.target.value)}
        type = "Password" placeholder = "Confirm password"
        
        ></input>
<Form.Group inline>
    <label>User type:</label>
    <Form.Radio label="Seeker" checked={userType === 'seeker'} value="seeker" onClick={() => setUserType('seeker')} />
    <Form.Radio label="Owner" checked={userType === 'owner'} value="owner" onClick={() => setUserType('owner')} />
</Form.Group>
{userType}
{ userType === "owner"? 
    <>
        <label className='label'>
                Company Name:
            </label>
            <input
            className='form-control'
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            type = "text" placeholder = "Company Name"
            
            ></input>
    </>:<></>
}
        
            <button className = "btn btn-primary"
            onClick={submitRegistration}
            // onClick={ submitLogin}
            >
                
                Register
            </button>
        <label>Already have an account? <a onClick={toggleMode}>Login</a></label>

    </div>


}

            
        </div>
    );
}

export default Login;