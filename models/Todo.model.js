const mongoose = require("mongoose")

const TodoSchema = mongoose.Schema({
    taskname:String,
    status:String,
    tag:String
})

const TodoModel = mongoose.model("Todos",TodoSchema)

module.exports={
    TodoModel
}