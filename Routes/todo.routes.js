const express = require("express")

const {TodoModel}= require('../models/Todo.model')
const todoRouter = express.Router()

// All Todos Here

todoRouter.get('/todos',async(req,res)=>{
    try{
        const todos = await TodoModel.find()
        res.status(200).send({"msg":"All Todos",todos})
    }
    catch(err){
        console.log(err)
        res.status(400).send({'err':"Something went wrong"})
    }
})

// Todos Create Method

todoRouter.post('/create',async(req,res)=>{
    const payload = req.body
    try{
        const newTodo = new TodoModel(payload)
        await newTodo.save()
        res.status(200).send({"msg":"Todo Created Success"})
    }
    catch(err){
        console.log(err)
        res.status(400).send({'err':"Something went wrong"})
    }
})

// Todo Update Method Here

todoRouter.patch('/update/:todoID',async(req,res)=>{
    const todoID = req.params.todoID
    const userID = req.body.userID
    const todos = await TodoModel.findOne({_id:todoID})
    if(userID !== todos.userID){
        res.status(400).send({"msg":'User is Not Authorized'})
    }
    try{
        await TodoModel.findByIdAndUpdate({_id:todoID},req.body)
        res.status(200).send({"msg":"Note Updated Successfully"})
    }
    catch(err){
        console.log(err)
        res.status(400).send({'err':"Something went wrong"})
    }
})

// Todo Deleted Method Here

todoRouter.delete("/delete/:todoID",async(req,res)=>{
    const todoID = req.params.todoID
    const userID = req.body.userID
    const todos = await TodoModel.findOne({_id:todoID})
    if(userID !== todos.userID){
        res.status(400).send({"msg":'User is Not Authorized'})
    }else{
        await TodoModel.findByIdAndDelete({_id:todoID})
        res.status(200).send({"msg":"Note Deleted Successfully"})
    }
})

module.exports={
    todoRouter
}