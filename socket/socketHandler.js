function socketHandler(io){
    io.on("connection",(user)=>{
        console.log("New user joined:",user.id);

        user.on("room:join",({roomid,userid})=>{
            if(!roomid||!userid){
                if(!roomid)
                    console.log("NO ROOMID");
                if(!userid)
                    console.log("NO USERID");

                return;
                

            } 

            user.join(roomid);
            console.log(`${user.id} joined room ${roomid}`);

            user.to(roomid).emit("room:user-joined",{
                userid:user.id
            })
        })

        user.on("room:leave",({roomid,userid})=>{
            user.leave(roomid);
            user.to(roomid).emit("room:user-left",{
                userid:user.id
            });
        })

        user.on("disconnect",()=>{
            console.log("user disconnected:",user.id);
        })


    })
}
module.exports=socketHandler;