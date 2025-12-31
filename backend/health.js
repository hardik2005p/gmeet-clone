const express=require("express");
const app=express();


app.get("/health",function(req,res){

    res.json({
        result:"ok"
    })

})

app.listen(3000);