import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import { Login_email } from './components/login'
import { Signup_email } from './components/signup'
function Health(){
    return (
      <div>
        My Health is Great
      </div>
    )
  }
function App() {
  const [count, setCount] = useState(0)
  
  
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login_email></Login_email>}></Route>
            <Route path="/signup" element={<Signup_email></Signup_email>}></Route>

          </Routes>
        </BrowserRouter>
        
        

      </div>
    </>
  )
}

export default App
