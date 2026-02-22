require('dotenv').config();


//-------express------//
const express = require("express");
const app = express();

//---http------//
const http=require("http");

//----cors-----//
const cors = require("cors");
app.use(cors());

//---socket io server----//
const {Server} =require("socket.io");
const server=http.createServer(app);


//----function imports----//
const signup = require("./backend/signup");
const login = require("./backend/login");
const {createRoom,joinRoom}=require("./backend/rooms")
const socketHandler=require("./socket/socketHandler")


//----body-parser----//
const bodyparser = require("body-parser");
app.use(bodyparser.json());


/*--------SOCKET.IO---------*/
const io=new Server(server,{
  cors:{
    origin:"*"
  }
})

const emailToSocketMapping= new Map();

socketHandler(io,emailToSocketMapping);

app.post("/auth/signup", signup);
app.post("/auth/login", login);
app.get("/room",createRoom);
app.post("/room",joinRoom);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

