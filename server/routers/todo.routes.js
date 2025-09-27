const express = require('express')
const router = express.Router()
const Todo = require('../Models/Todo.schema.js')
const { createTodo, editTodo ,deleteTodo } = require('../cotrollers/todo.controller.js')

router.get('/', async (req, res) => {
  console.log("this is " ,Todo)
  const todos = await Todo.find()
  res.json(todos)
})

router.post('/', createTodo)
router.put('/:id', editTodo)
router.delete('/:id',deleteTodo)

module.exports = router
