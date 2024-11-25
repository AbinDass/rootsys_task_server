import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            min:8,
        }
    },
    { timestamps: true }
);

const user = mongoose.model("User", userSchema);
export default user;
