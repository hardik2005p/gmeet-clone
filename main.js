require('dotenv').config();

const express = require("express");
const app = express();
const http=require("http");
const bodyparser = require("body-parser");
const cors = require("cors");
const {Server} =require("socket.io");
const server=http.createServer(app);

const signup = require("./backend/signup");
const login = require("./backend/login");
const {createRoom,joinRoom}=require("./backend/rooms")




app.use(cors());
app.use(bodyparser.json());

io.on("connection",(socket)=>{
  console.log("socket connected:",socket.id);

  socket.on("disconnect",()=>{
    console.log("socket disconnected:",socket.id)
  })

})

app.post("/auth/signup", signup);
app.post("/auth/login", login);
app.get("/room",createRoom);
app.post("/room",joinRoom);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
