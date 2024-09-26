const express = require("express");
const app=express();
app.use("/nn",(req,res)=>{
    res.send("Hello nn!");
})
app.use("/hello",(req,res)=>{
    res.send("Hello!");
})
app.use("/",(req,res)=>{
    res.send("Hello from server!");
})
app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777...");
});