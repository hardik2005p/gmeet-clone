const mongoose=require("mongoose")

mongoose.connect(process.env.MongoDB_URL);

const userSchema=new mongoose.Schema({
    email:{
        type: String,
        unique: true,
    },
    password:String
    
    
})

const RoomSchema=new mongoose.Schema({
    roomid : {
        type:String,
        unique:true
    },
    roomCode: {
        type:String,
        unique:true
    }
    

})
const User=mongoose.model('User',userSchema)
const Room=mongoose.model('Room',RoomSchema)

module.exports={
    User,
    Room
};
