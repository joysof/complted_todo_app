const express = require('express')
const Todo = require('../Models/Todo.js')


// create todo 

const createTodo = async(req , res) =>{
    const newTodo = new Todo({text: req.body.text})
    const savedTodo = await newTodo.save()
    res.json(savedTodo)
}

const editTodo =async (req, res) => {
  try {
     const {id} = req.params
     const {text} =req.body
    const updateTodo = await Todo.findByIdAndUpdate(id,
      { 
        text,
      },
      { new: true }
    );
    if (!updateTodo) return res.status(404).json({ message: "Todo not found" });
    res.json(updateTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {createTodo , editTodo}