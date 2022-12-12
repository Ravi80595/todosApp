const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:String,
    password:String,
    name:String,
    age:Number,
    // IP:String
})

const UserModel = mongoose.model("User",userSchema)

module.exports={
    UserModel
}