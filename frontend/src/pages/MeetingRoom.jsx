import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { socket } from "../socket";
import { useState } from "react";
import { useRef } from "react";
import { startLocalStream , Createoffer, Recieveoffer} from "../webrtc";
export function MeetingRoom(){
    const {roomid}=useParams();
    const location=useLocation();
    const peerConnections = useRef({});
    const localVideoRef=useRef(null);
    const localStreamRef=useRef(null);

    

    const roomPassword=location.state.roomPassword||{};
    const email=location.state.email||{};
    function sendMessage()
    {
      socket.emit("chat:message",{message})
    }


    useEffect(()=>{
      async function init(){
        await startLocalStream(localVideoRef,localStreamRef);

        socket.connect();

        socket.on("connect", () => {
          socket.emit("room:join", {
            roomid: roomid,
            userid: socket.id,
            emailid:email
          });
        });
        
        //---Create offer---//
        socket.on("room:user-joined",(userid)=>{Createoffer(userid,localStreamRef,peerConnections,socket)});

        socket.on("room:user-left",(data)=>{
          console.log("user left: ",data.userid)
        })

        socket.on("chat:message", (data) => {
          console.log(data.userid, ":", data.message);
        });

        //----Recieve Offer -> create answer----//
        socket.on("webrtc:offer",({offer,from})=>{Recieveoffer({offer,from},localStreamRef,peerConnections,socket)})

        //---- Receive Answer----//
        socket.on("webrtc:answer",async({answer,from})=>{
          const pc = peerConnections.current[from];
          if (!pc) return;

          if (pc.signalingState !== "have-local-offer") {
            console.warn("Ignoring answer in state:", pc.signalingState);
            return;
          }
          await peerConnections.current[from].setRemoteDescription(answer);
        })

        socket.on("webrtc:ice", ({ candidate, from }) => {
          peerConnections.current[from].addIceCandidate(candidate);
        });




        

        return()=>{
            

            
            socket.off("room:user-joined");
            socket.off("room:user-left");
            socket.off("connect");
            socket.off("chat:message");
            socket.off("webrtc:offer");
            socket.off("webrtc:answer");
            socket.off("webrtc:ice");



            

            socket.disconnect();
        }
      }
      init();
    },[roomid]);


    const [message,setMessage]=useState();

    return (
    <div>
      <div style={{ position: "absolute", top: 10, right: 10 }}>
        <p>Room: {roomid}</p>
        <p>Password: {roomPassword}</p>
        <input placeholder="Send Message" onChange={(e)=>setMessage(e.target.value)}></input>
        <button onClick={sendMessage}>Send</button>
        <video ref={localVideoRef} autoPlay muted style={{width:"300px"}}></video>
        
      </div>

      <h2>Meeting Room</h2>
    </div>
  );

}