const express = require("express");

const app=express();

app.post('/login',(req,res)=>{
    return res.json({});
})

app.post('/signup',(req,res)=>{

})


app.listen(3000,()=>{
    console.log("Runing in port 3000")
})

