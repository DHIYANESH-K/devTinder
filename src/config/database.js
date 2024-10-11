const mongoose=require("mongoose");

const connectDB=async()=>{
    // await mongoose.connect("mongodb+srv://dhiyanesh177:lCvDRwFCkCTbDMnP@cluster0.ci0ml.mongodb.net/devTinder");
    await mongoose.connect("mongodb://localhost:27017/devTinder");
};


module.exports=connectDB