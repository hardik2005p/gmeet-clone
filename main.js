require('dotenv').config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const signup = require("./backend/signup");
const login = require("./backend/login");

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.post("/auth/signup", signup);
app.post("/auth/login", login);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
