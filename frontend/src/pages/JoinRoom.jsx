import { useState } from "react"
import './joinroom.css'
import { useNavigate } from "react-router-dom";
const local=import.meta.env.VITE_LOCAL
export function JoinRoom(){
    const [roomid,setroomid]=useState();
    const [roomPassword,setroomPassword]=useState();
    const navigate=useNavigate();

    async function joinRoomHandle(){

        try{
            const response=await fetch(`${local}/room`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    roomid: roomid,
                    password: roomPassword
                })      
            })
            const data=await response.text();
            if(!response.ok)
            {
                alert(data);
                return;
            }
            navigate(`/meetingRoom/${roomid}`,{
                state:{
                    roomid,
                    roomPassword,
                    
                }
            });
            
        }
        catch(e)
        {
            console.log(e);
        }
        

    }


    return (
        <div className="container">
            <div className="card">
                <input className="input" placeholder="Room ID" onChange={(e)=>setroomid(e.target.value)} ></input>
                <input className="input" placeholder="Room Password" onChange={(e)=>setroomPassword(e.target.value)}></input>
                <button className="btn" onClick={joinRoomHandle}>Join Room</button>
            </div>
            
        </div>
    )

}