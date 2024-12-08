import mongoose, { Schema } from "mongoose";

let user = new Schema({
    email: String, 
    password: String,
    name: String, 
    address: String,
    pincode: String
})

let User = mongoose.model("User", user)

export default User;