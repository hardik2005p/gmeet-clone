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
    id:String,
    roomCode: String,
    createdBy:String,

})
const User=mongoose.model('User',userSchema)
const Room=mongoose.model('Room',RoomSchema)

module.exports={
    User,
    Room
};
