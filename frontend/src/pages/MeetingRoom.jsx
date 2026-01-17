import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { socket } from "../socket";
import { useState } from "react";

export function MeetingRoom(){
    const {roomid}=useParams();
    const location=useLocation();

    const roomPassword=location.state.roomPassword||{};

    function sendMessage()
    {
      socket.emit("chat:message",{message})
    }


    useEffect(()=>{
        socket.connect();

        socket.on("connect", () => {
          socket.emit("room:join", {
            roomid: roomid,
            userid: socket.id
          });
        });

        socket.on("room:user-joined",(data)=>{
          console.log("User Joined:",data.userid);
        })

        socket.on("room:user-left",(data)=>{
          console.log("user left: ",data.userid)
        })

        socket.on("chat:message", (data) => {
          console.log(data.userid, ":", data.message);
        });


        

        return()=>{
            

            
            socket.off("room:user-joined");
            socket.off("room:user-left");
            socket.off("connect");
            socket.off("chat:message");


            

            socket.disconnect();
        }
    },[roomid]);

    const [message,setMessage]=useState();

    return (
    <div>
      <div style={{ position: "absolute", top: 10, right: 10 }}>
        <p>Room: {roomid}</p>
        <p>Password: {roomPassword}</p>
        <input placeholder="Send Message" onChange={(e)=>setMessage(e.target.value)}></input>
        <button onClick={sendMessage}>Send</button>
        
      </div>

      <h2>Meeting Room</h2>
    </div>
  );

}