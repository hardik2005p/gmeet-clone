import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { socket } from "../socket";

export function MeetingRoom(){
    const {roomid}=useParams();
    const location=useLocation();

    const {roomCode,roomPassword}=location.state||{};


    useEffect(()=>{
        socket.connect();
        socket.emit("room:join",{
            roomid,
            userid:socket.id

        })

        socket.on("room:user-joined",(data)=>{
            console.log("User Joined:",data);
        })

        return()=>{
            socket.emit("room:leave",{
                roomid,
                userid:socket.id
            })

            socket.disconnect();
        }
    },[roomid]);

    return (
    <div>
      <div style={{ position: "absolute", top: 10, right: 10 }}>
        <p>Room: {roomCode}</p>
        <p>Password: {roomPassword}</p>
      </div>

      <h2>Meeting Room</h2>
    </div>
  );

}