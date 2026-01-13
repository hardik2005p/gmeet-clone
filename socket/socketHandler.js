function socketHandler(io){
    io.on("connection",(user)=>{
        console.log("New user joined:",user.id);

        user.on("room:join",({roomdid,userid})=>{
            if(!roomdid||!userid) return;

            user.join(roomdid);
            console.log(`${userid} joined room ${roomid}`);

            user.to(roomid).emit("room:user-joined",{
                userid,
                socketid:user.id
            })
        })

        user.on("room:leave",({roomid,userid})=>{
            user.leave(roomid);
            user.to(roomid).emit("room:user-left",{userid});
        })

        user.on("disconnect",()=>{
            console.log("user disconnected:",user.id);
        })


    })
}
module.exports=socketHandler;