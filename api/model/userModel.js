import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user : {type : String , required : true , unique : true } ,
    email: {type : String , required : true , unique : true } ,
    pass : {type : String , required : true } ,
})

export default mongoose.model("users",userSchema)