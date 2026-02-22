export async function startCamera(){
  const stream=await navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true,
  });

  return stream;
}

export function createPeerConnection(){
  const pc=new RTCPeerConnection({
    iceServers:[{urls:"stun:stun.l.google.com:19302"}]
  })
  return pc;
}

export async function createOffer(pc){
  const offer=await pc.createOffer();
  await pc.setLocalDescription(offer);
  return offer;
}

export async function createAnswer(pc,offer){

  // saving connection infor of other users
  await pc.setRemoteDescription(offer);
  const answer =await pc.createAnswer();
  //saving connection of itself;
  await pc.setLocalDescription(answer);
  return answer;
}

export function handleIce(pc,socket,userid)
{
  pc.onicecandidate=(event)=>{
    if(event.candidate)
    {
      socket.emit("webrtc:ice",{candidate:event.candidate,to:userid});
    }
  };
}