const express = require("express");
const app=express();
const connectDB=require("./config/database");
const {adminAuth}=require("./middleware/auth");
const User=require("./models/user.js");
const validator=require("validator");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt=require("bcrypt");

app.use(express.json());

app.post("/signup",async(req,res)=>{
    // console.log(req.body);
    try{
        validateSignUpData(req);
        // if(!validator.isStrongPassword(req.body.password))
        // {
        //     throw new Error("provide strong password");
        // }

        // Encrypting the password 

        const {firstName,lastName,emailId,password}=req.body;

        const passwordHash=await bcrypt.hash(password,10);


        const user=new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash
        });
        await user.save()
        res.send("user added successfully");
    }
    catch(err)
    {
        res.status(400).send("Error saving the user :" + err.message);
    }
});

app.get("/user",async(req,res)=>{
    console.log(req.body)
    const userEmail=req.body.emailId;
    try{
        let user=await User.find({emailId:userEmail})
        if(!user)
        {
            res.send("user not found");
        }
        else{
            res.send(user)
        }
    }
    catch{
        res.status(400).send("something went wrong");
    }
})

// app.delete("/user",async(req,res)=>{
//     const userId=req.body.userId;
//     try{
//         // const user=await User.findByIdAndDelete({_id:userId});
//         const user=await User.findByIdAndDelete(userId);
//         res.send("user deleted successfully");
//     }
//     catch(err){
//         res.status(400).send("something went wrong");
//     }
// });

app.delete("/user",async(req,res)=>{
    const emailId=req.body.emailId;
    try{
        // const user=await User.findByIdAndDelete({_id:userId});
        const user=await User.findOneAndDelete({emailId:emailId});
        res.send("user deleted successfully");
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
});

app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    // console.log(data);
    try{
        const ALLOWED_UPDATES=["photoURL","about","gender","age","skills"]
        const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed)
        {
            throw new Error("Update not allowed");
        }
        // const user=await User.findByIdAndUpdate({_id:userId},data);
        const user=await User.findByIdAndUpdate(userId,data,{
            returnDocument:"after",
            runValidators:true,
        });
        console.log(user);
        res.send("user updated successfully");
    }
    catch(err)
    {
        res.status(400).send("something went wrong :"+ err);
    }
})


connectDB()
.then(()=>{
    console.log("DB connection established...");  
    app.listen(7777,()=>{
        console.log("server is running....");
    })
})
.catch((err)=>{
    console.error("DB can't be connected");
})

