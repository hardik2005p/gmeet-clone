import { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';


export function Login_email(){
    const [Email,setEmail]=useState("");
    const [Password,setPassowrd]=useState("");
    const navigate=useNavigate();

    async function handleLogin() {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: Email,
          password: Password
        })
      });

      const data = await response.text(); // token or error

      if (!response.ok) {
        alert(data);
        return;
      }

      // store token
      localStorage.setItem("token", data);

      // navigate after success
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  }
  
    return(
    <div>
        <div className='login-page'>
            <div className='login-card'>
             <h2 >Login</h2>
             <input  type='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}></input> <br></br>
             <input placeholder='Passowrd' onChange={(e)=>setPassowrd(e.target.value)}></input>
             <button onClick={handleLogin}>
                login
             </button>

            </div>
            
        </div>
    </div>
    )
    
}