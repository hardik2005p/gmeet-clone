import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { socket } from "../socket";

export function MeetingRoom(){
    const {roomid}=useParams();
    const location=useLocation();

    const roomPassword=location.state.roomPassword||{};


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

        return()=>{
            socket.emit("room:leave",{
                roomid:roomid,
                userid:socket.id
            })

            socket.off("connect");
            socket.off("room:user-joined");
            socket.off("room:user-left");


            

            socket.disconnect();
        }
    },[roomid]);

    return (
    <div>
      <div style={{ position: "absolute", top: 10, right: 10 }}>
        <p>Room: {roomid}</p>
        <p>Password: {roomPassword}</p>
      </div>

      <h2>Meeting Room</h2>
    </div>
  );

}