const express = require("express");
const app=express();
const {adminAuth}=require("./middleware/auth")

app.use("/admin",adminAuth)

app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data sent")
})
app.get("/admin/deleteUser",(req,res)=>{

    res.send("Deleted a user");
})


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
app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777...");
});