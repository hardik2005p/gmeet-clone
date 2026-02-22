

function socketHandler(io,emailToSocketMapping){
    io.on("connection",(user)=>{
        console.log("New user joined:",user.id);

        user.currentRoom=null;

        user.on("room:join",({roomid})=>{
            if(!roomid){
                if(!roomid)
                    console.log("NO ROOMID");
                

                return;
                

            } 
            
            user.currentRoom=roomid;

        

            user.join(roomid);
            console.log(`${user.id} joined room ${roomid}`);

            user.to(roomid).emit("room:user-joined",{userid:user.id})
        })

        user.on("chat:message",(message)=>{
            if(!user.currentRoom||!message)
                return;
            
            user.to(user.currentRoom).emit("chat:message",{userid:user.id,message,
                timestamp: new Date().toLocaleTimeString([],{hour:"2-digit",minute: "2-digit"}),
            });


        })

        //----Web-RTC---//

        // 1. sending offer to the new user that joined which is {to};
        user.on("webrtc:offer",({offer,to})=>{
            io.to(to).emit("webrtc:offer",{
                offer,
                from:user.id
            })
        })


        // 2. Sending asnwer to the existing users from the new user;
        user.on("webrtc:answer",({answer,to})=>{
            io.to(to).emit("webrtc:answer",{
                answer,
                from: user.id
            })
        })

        user.on("webrtc:ice", ({ candidate, to }) => {
            io.to(to).emit("webrtc:ice", {
                candidate,
                from: user.id
            });
        });

        

        user.on("disconnect",()=>{
            console.log("user disconnected:",user.id);
            if(user.currentRoom!=null){
                user.to(user.currentRoom).emit("room:user-left",{
                    userid:user.id
                });
            }
        })


    })
}
module.exports=socketHandler;