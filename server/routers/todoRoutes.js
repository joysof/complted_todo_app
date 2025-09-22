const express = require("express")
const router = express.Router()
const Todo = require('../Models/Todo')
const { createTodo ,editTodo } = require("../cotrollers/Todo.Controllers")

router.get("/" , async(req , res) =>{
    const todos = await Todo.find()
    res.json(todos);
    
})



// router.post("/" , async(req , res) =>{
//     const newTodo = new Todo({text: req.body.text})
//     const savedTodo = await newTodo.save()
//     res.json(savedTodo)
// })
 router.post('/' , createTodo)
router.put("/:id" , editTodo)
router.delete("/:id" , async(req , res) =>{
    await Todo.findByIdAndDelete(req.params.id)
    res.json({message : "Delete"})
})


module.exports = router