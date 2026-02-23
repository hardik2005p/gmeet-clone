require('dotenv').config();
const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");

const signup = require("./backend/signup");
const login = require("./backend/login");
const { createRoom, joinRoom } = require("./backend/rooms");
const socketHandler = require("./socket/socketHandler");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const credentials = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

const server = https.createServer(credentials, app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const emailToSocketMapping = new Map();
socketHandler(io, emailToSocketMapping);

app.post("/auth/signup", signup);
app.post("/auth/login", login);
app.get("/room", createRoom);
app.post("/room", joinRoom);

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});