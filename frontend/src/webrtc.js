function createPeerConnection(remoteSocketId,localStream,peers,socket) {
    if (peers.current[remoteSocketId]) {
        return peers.current[remoteSocketId]; // 🔥 reuse
    }
    if (!localStream.current) {
        console.error("❌ Local stream not ready yet");
        return null;
    }
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    localStream.current.getTracks().forEach((track) => {
      pc.addTrack(track, localStream.current);
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("webrtc:ice", {
          candidate: event.candidate,
          to: remoteSocketId,
        });
      }
    };

    pc.ontrack = (event) => {
      const remoteVideo = document.createElement("video");
      remoteVideo.srcObject = event.streams[0];
      remoteVideo.autoplay = true;
      remoteVideo.style.width = "300px";
      document.body.appendChild(remoteVideo);
    };

    peers.current[remoteSocketId] = pc;
    return pc;
  }


export async function startLocalStream(localVideoRef,localStreamRef){
    const stream=await navigator.mediaDevices.getUserMedia({
        video:true,
        audio: true
    })

    localVideoRef.current.srcObject=stream;
    localStreamRef.current=stream;
    return stream;
}


export async function Createoffer(userid,localStreamRef,peers,socket)
{
    console.log("new user joined:",userid);
    const pc= createPeerConnection(userid,localStreamRef,peers,socket);
    if(!pc)
    {
        console.log("no pc found");
        return;
    }
    if (pc.signalingState !== "stable") {
        console.log("no signal state")
        return;
    }
    const offer=await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("webrtc:offer",{
        offer,
        to:userid,
    })


}

export async function Recieveoffer({offer,from},localStreamRef,peers,socket) {
    const pc = createPeerConnection(from,localStreamRef,peers,socket);

        await pc.setRemoteDescription(offer);

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socket.emit("webrtc:answer", {
          answer,
          to: from,
        });
    
}

