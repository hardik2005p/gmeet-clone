require('dotenv').config()
const express=require("express");
const app=express();

const signup=require("./backend/signup");
const {User,Room}=require("./backend/index");
const login=require("./backend/login")
const bodyparser=require("body-parser")
app.use(bodyparser.json())



const JWT_Secret=process.env.JWT_Secret;
//console.log(JWT_Secret)
app.post('/auth/signup',signup);

app.post("/auth/login",login);

app.listen(3000);
module.exports=JWT_Secret;