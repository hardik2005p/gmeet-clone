import { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';


export function Signup_email(){
    const [Email,setEmail]=useState("");
    const [Password,setPassowrd]=useState("");

    const navigate=useNavigate();
    async function signupHandle() {
        try{
            const response=await fetch("http://localhost:3000/auth/signup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email:Email,
                    password:Password
                })



            })
            const data=await response.text();

            if(!response.ok)
            {
                alert(data);
                return ;

            }
            alert(data);
            navigate("/Room")
        }
        catch(e){
            console.log(e);
        }


        
    }
    return(
    <div>
        <div className='login-page'>
            <div className='login-card'>
             <h2 >Signup</h2>
             <input type='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}></input> <br></br>
             <input  placeholder='Passowrd' onChange={(e)=>setPassowrd(e.target.value)}></input>
             <button onClick={signupHandle}>Signin</button>

            </div>
        </div>
    </div>
    )
    
}