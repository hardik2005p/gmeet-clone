import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { socket } from "../socket";
import { useState } from "react";
import { useRef } from "react";

import {createAnswer, createOffer, createPeerConnection, handleIce, startCamera} from '../webrtc'

export function MeetingRoom(){
    const {roomid}=useParams();
    const location=useLocation();
    const peerConnections = useRef({});
    const localVideoRef=useRef(null);
    const localStreamRef=useRef(null);
    const password=location.state.roomPassword;
    const [messages,setMessages]=useState([]);
    const [input,setInput]=useState("")
    useEffect(()=>{
      async function init(){

        // 1. Start Camera
        const stream=await startCamera();
        localVideoRef.current.srcObject=stream;
        localStreamRef.current=stream;

        // 2. Connect to socket
        socket.connect()


        // 3. Join the room
        socket.on("connect",()=>{
          socket.emit("room:join",{
            roomid,

          });

        })

        // 4. create a connection between the new user(userid) and exisitng users
        socket.on("room:user-joined",async ({userid})=>{

          // 5. Create a Peer Connection
          const pc= createPeerConnection();
          peerConnections.current[userid]=pc;

          
          

          pc.ontrack = (event) => {
            //console.log("existing element:", document.getElementById(`video-${userid}`));
            if(document.getElementById(`video-${userid}`)) return ;
            const stream = event.streams[0];
            
            // create a video element for this user
            const videoElement = document.createElement("video");
            videoElement.id = `video-${userid}`;
            videoElement.srcObject = stream;
            videoElement.autoplay = true;
            videoElement.playsInline = true;
            videoElement.style.width = "300px";
            videoElement.style.borderRadius = "10px";

            // add it to the video grid
            document.getElementById("video-grid").appendChild(videoElement);
          };
          
          // 6. add stream to this connection (now this stream is of the existing users)
          localStreamRef.current.getTracks().forEach((track)=>{
            console.log("adding track :",track.kind)
            pc.addTrack(track,localStreamRef.current);
          })

          // adds the new found ice candidate to all the users, required for path identification
          handleIce(pc,socket,userid);

          

          // 7. Create Offer
          const offer=await createOffer(pc);

          // 8. Sending offer to the new user from the existing users
          socket.emit("webrtc:offer",{offer,to:userid});
        });

        // 9. Offer now recieved by the new user from the existing users;
        socket.on("webrtc:offer",async ({offer,from})=>{

          // 10. Create a peer connection for this user
          const pc=createPeerConnection();
          peerConnections.current[from]=pc;
        
          pc.ontrack = (event) => {
            if (document.getElementById(`video-${from}`)) return;
            
            const stream = event.streams[0];
  
            // create a video element for this user
            const videoElement = document.createElement("video");
            videoElement.id = `video-${from}`; 
            videoElement.srcObject = stream;
            videoElement.autoplay = true;
            videoElement.playsInline = true;
            videoElement.style.width = "300px";
            videoElement.style.borderRadius = "10px";

            // add it to the video grid
            document.getElementById("video-grid").appendChild(videoElement);
          };

          // 11. Adds the stream to this connection (this stream is of the new user)
          localStreamRef.current.getTracks().forEach((track)=>{
            console.log("adding track :",track.kind)
            pc.addTrack(track,localStreamRef.current);
          })

          // adds the new found ice candidate to all the users, required for path identification
          handleIce(pc,socket,from);


          // 12. Creates the answer
          const answer=await createAnswer(pc,offer);

          // 13. Answer sent to the user from which offer came
          socket.emit("webrtc:answer",{answer,to:from});
        })


        // 14. the asnwer is now recieved from the new user by existing users, here {from}=new user id;
        socket.on("webrtc:answer",async({answer,from})=>{
          const pc=peerConnections.current[from];
          await pc.setRemoteDescription(answer);
        });


        // 15. the ice candidate that needs to be added handled here
        socket.on("webrtc:ice",({candidate,from})=>{
          const pc=peerConnections.current[from];
          pc.addIceCandidate(candidate);
        })

        socket.on("room:user-left",({userid})=>{
          //close peer connection

          const pc=peerConnections.current[userid];

          if(pc){
            pc.close();
            delete peerConnections.current[userid];
          }

          const videoElement=document.getElementById(`video-${userid}`);
          if(videoElement)videoElement.remove();
        })


        // Send Messages
        socket.on("chat:message", ({ userid, message, timestamp }) => {
          setMessages((prev) => [...prev, { userid, message, timestamp, self: false }]);
        });
        





      }



      init();

      function sendMessage(){
        if(!input.trim())
          return;
      }

      return ()=>{

        // 1. Stop Camera
        if(localStreamRef.current)
        {
          localStreamRef.current.getTracks().forEach((track)=>track.stop());
        }

        // 2. Close all peer Connections
        Object.values(peerConnections.current).forEach((pc)=>pc.close());
        peerConnections.current={};

        socket.off("connect");
        socket.off("room:user-joined");
        socket.off("webrtc:offer");
        socket.off("webrtc:answer");
        socket.off("webrtc:ice");

        socket.disconnect();

      }

    },[])



    return (
    <div style={{  minHeight: "100vh", padding: "16px" }}>
      <h2 style={{ color: "black", textAlign: "center" }}>Meeting Room</h2>
      <h3>roomid={roomid} , Password={password}</h3>
      

      {/* Video Grid */}
      <div id="video-grid" style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>

        {/* Your video */}
        <div style={{ position: "relative" }}>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            style={{ height:"300px",width: "400px", borderRadius: "10px", background: "#000", display: "block" }}
          />
          <span style={{
            position: "absolute", bottom: 8, left: 8,
            background: "rgba(0,0,0,0.55)", color: "white",
            fontSize: "12px", padding: "2px 8px", borderRadius: "4px"
          }}>
            You
          </span>
        </div>

        {/* Remote videos will go here later */}

      </div>
    </div>
  );

    

   

}