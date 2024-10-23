const express = require("express");
const app=express();
const connectDB=require("./config/database");
const {adminAuth}=require("./middleware/auth");
const User=require("./models/user.js");
const validator=require("validator");

app.use(express.json());

app.post("/signup",async(req,res)=>{
    // console.log(req.body);
    const user=new User(req.body);
    try{
        if(!validator.isStrongPassword(req.body.password))
        {
            throw new Error("provide strong password");
        }
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

// app.post("/signup",async(req,res)=>{
//     const user=new User({
//         firstName:"Dhiyanesh",
//         lastName:"K",
//         emailId:"dhiyanesh177@gmail.com",
//         password:"Dhiyan@123",
//     });
//     try{
//         await user.save()
//         res.send("user added successfully");
//     }
//     catch(err)
//     {
//         res.status(400).send("Error saving the user :" + err.message);
//     }
// });




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






// app.use("/admin",adminAuth)

// app.get("/admin/getAllData",(req,res)=>{
//     console.log(a)
//     res.send("All Data sent")
// })
// app.get("/admin/deleteUser",(req,res)=>{

//     res.send("Deleted a user");
// })
// app.use("/",(req,res)=>{
//     res.send("hello");
// })
// app.use((err,req,res,next)=>{
    
//     console.log(err.stack)
//         res.send("error occured");
    
// })




// app.get("/admin/getAllData",(req,res)=>{
//     const token="abc";
//     const isAdminAuthorized=token==="xyz";
//     if(isAdminAuthorized)
//     {
//         res.send("All Data sent");
//     }
//     else{
//         res.status(401).send("Unauthorized request");
//     }
// })
// app.get("/admin/deleteUser",(req,res)=>{
//     const token="xyz";
//     const isAdminAuthorized=token==="xyz";
//     if(isAdminAuthorized)
//     {
//         res.send("Deleted a user");
//     }
//     else{
//         res.status(401).send("Unauthorized request");
//     }
// })




// app.use('/',(req,res,next)=>{
//     // res.send("Handling/route");
//     next();
// })
// app.get("/user",(req,res,next)=>{
//     console.log("Handling/user route");
//     next();
// })



// app.use("/user",(req,res,next)=>{
//     console.log("Handling the route user 1");
//     next();
//     //  res.send("Response 1");
// },
// (req,res,next)=>{
//     console.log("Handling the route user 2");
//     // res.send("Response 2");
//     next();
// });


// app.use("/user",(req,res,next)=>{
//     next();
// });
// app.use("/user",(req,res)=>{
//     res.send("Handling response handler");
// })

// app.use("/abc/:name/:userId/:pass",(req,res)=>{
//     console.log(req.params)
//     res.send("abc")
// })


// app.get("/abc",(req,res)=>{
//     console.log(req.query)
//     res.send("abc");
// });




// app.use("/user",(req,res)=>{
//     res.send("use user");
// })
// app.get("/user",(req,res)=>{
//     res.send("get user");
// })
// app.post("/user",(req,res)=>{
//     res.send("post user");
// })
// app.delete("/user",(req,res)=>{
//     res.send("delete user");
// })





// app.use("/nn",(req,res)=>{
//     res.send("Hello nn!");
// })
// app.use("/hello",(req,res)=>{
//     res.send("Hello!");
// })
// app.use("/",(req,res)=>{
//     res.send("Hello from server!");
// })

// app.listen(7777,()=>{
//     console.log("Server is successfully listening on port 7777...");
// });