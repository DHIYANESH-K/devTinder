const mongoose=require("mongoose");
const validator=require("validator");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20,
        trim:true,
    },
    lastName:{
        type:String,
        maxlength:10,
        trim:true,
    },
    emailId:{
        type:String,
        required:true,
        lowerCase:true,
        unique:true,
        trim:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email Id");
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        trim:true,
    },
    age:{
        type:Number,
        max:90,
        min:18,
    },
    photoURL:{
        type:String,
        default:"https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    },
    gender:{
        type:String,
        validate(value)
        {
            if(!["Male","Female","Others"].includes(value))
            {
                throw new Error("Gender not Valid")
            }
        },
    },
    about:{
        type:String,
    },
    skills:{
        type:[String],
    }
},{
    timestamps:true,
});

const User=mongoose.model("user",userSchema);
module.exports=User