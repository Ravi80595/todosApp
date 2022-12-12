const express = require('express')
const cors = require("cors")

const {connection} = require("./config/db")
const {UserRouter} = require("./Routes/User.route")
const {todoRouter} = require("./Routes/todo.routes")
// const {authenticate} = require("./Middelwares/authenticate")
const {authenticate} = require("./Middelwares/authenticate")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).send("Welecome to Ravi Sharma TODO api")
})

app.use("/user",UserRouter)

app.use(authenticate)

app.use("/",todoRouter)



app.listen(1236,async()=>{
    try{
        await connection 
        console.log('Connected to db')
    }
    catch(err){
        console.log(err)
        console.log('connection failed')
    }
    console.log("Listning on port 1236")
})