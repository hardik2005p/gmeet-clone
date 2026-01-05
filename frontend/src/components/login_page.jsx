import { useState } from 'react'
import './login.css'


export function Login_email(){
    const [Email,setEmail]=useState("");
    const [Password,setPassowrd]=useState("");

    
    return(
    <div>
        <div className='login-page'>
            <div className='login-card'>
             <h2 >Login</h2>
             <input  placeholder='Email' onChange={(e)=>setEmail(e.target.value)}></input> <br></br>
             <input placeholder='Passowrd' onChange={(e)=>setPassowrd(e.target.value)}></input>

            </div>
        </div>
    </div>
    )
    
}