import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import { Login_email } from './components/login_page'
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
            <Route path="/health" element={<Health/>}></Route>
          </Routes>
   
        </BrowserRouter>

        <Login_email></Login_email>

      </div>
    </>
  )
}

export default App
