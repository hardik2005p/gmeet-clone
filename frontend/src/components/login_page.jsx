import { useState } from 'react'
import './login.css'


export function Login_email(){
    const [Email,setEmail]=useState("");
    const [Passowrd,setPassowrd]=useState("");

    function handleEmail(e){
        setEmail(e.target.value)

}
function handlePassword(e)
{
    setPassowrd(e.target.value)
}
    return(
    <div>
        <div>
             <h2>Login</h2>
             <input placeholder='Email' onChange={handleEmail}></input> <br></br>
             <input placeholder='Passowrd' onChange={handlePassword}></input>
        </div>
    </div>
    )
    
}