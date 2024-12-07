import mongoose, { Schema } from "mongoose";

const admin = new Schema({
    username: String, 
    password: String,
})

const Admin = mongoose.model("Admin", admin)

export default Admin;