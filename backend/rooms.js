const crypto=require("crypto");
const {nanoid}=require("nanoid");
const bcrypt=require("bcryptjs")
const {Room}=require(".")

async function createRoom(req,res) {

    const roomid=nanoid(10);
    const roomPassword=crypto.randomBytes(10).toString("base64").replace(/[^a-zA-Z0-9]/g,"").slice(0,8);
    const passwordHash=await bcrypt.hash(roomPassword,10);
    

    await Room.create({
        roomid:roomid,
        roomCode:passwordHash
    })

    res.status(201).json({
        roomid:roomid,
        password:roomPassword

    })
    
    
    
}
async function joinRoom(req,res)
{
    try{
        const roomid=req.body.roomid;
        const password=req.body.password;

        if(!roomid||!password)
        {
            return res.status(400).json({
                message:"RoomCode and Password required"
            })
        }
        const room=await Room.findOne({roomid:roomid});
        if(!room)
        {
            return res.status(404).json({
                message:"Room does not exist"
            })
        }
        const isValid=await bcrypt.compare(password,room.roomCode);
        if(!isValid){
            return res.status(403).json({
                message:"Invalid Room Password"
            })

        }
        res.json({message:"Joined Room Successfully"})




    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })

    }


}

module.exports={
    createRoom,
    joinRoom
}




