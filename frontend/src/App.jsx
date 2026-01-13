import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import { Login_email } from './components/login'
import { Signup_email } from './components/signup'
import { RoomsPage } from './pages/Room'
import { MeetingRoom } from './pages/MeetingRoom'

function App() {
  const [count, setCount] = useState(0)
  
  
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login_email></Login_email>}></Route>
            <Route path="/signup" element={<Signup_email></Signup_email>}></Route>
            <Route path="/Room" element={<RoomsPage/>}></Route>
            <Route path="/meetingRoom/:roomid" element={<MeetingRoom></MeetingRoom>}></Route>
          </Routes>
        </BrowserRouter>
        
        

      </div>
    </>
  )
}

export default App
