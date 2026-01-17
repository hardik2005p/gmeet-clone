const { socket } = require("../frontend/src/socket");

function socketHandler(io){
    io.on("connection",(user)=>{
        console.log("New user joined:",user.id);

        socket.currentRoom=null;

        user.on("room:join",({roomid,userid})=>{
            if(!roomid||!userid){
                if(!roomid)
                    console.log("NO ROOMID");
                if(!userid)
                    console.log("NO USERID");

                return;
                

            } 

            socket.currentRoom=roomid;

        

            user.join(roomid);
            console.log(`${user.id} joined room ${roomid}`);

            user.to(roomid).emit("room:user-joined",{
                userid:user.id
            })
        })

        user.on("chat:message",(message)=>{
            if(!socket.currentRoom||!message)
                return;
            
            user.to(socket.currentRoom).emit("chat:message",{userid:user.id,message});


        })

        

        user.on("disconnect",()=>{
            console.log("user disconnected:",user.id);
            if(socket.currentRoom!=null){
                user.to(socket.currentRoom).emit("room:user-left",{
                    userid:user.id
                });
            }
        })


    })
}
module.exports=socketHandler;