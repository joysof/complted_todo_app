
import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

import AddTodo from './component/AddTodo';
import AllTodos from './component/AllTodos';

function App() {
  const backend_url ='http://localhost:5000/'
const [todos , setTodos] = useState([])
const [text , setText] = useState("")
const [editText , setEditText] = useState('')
const [editingTodo , setEditingTodo] = useState('')

const fetchTodos = async () =>{
  try {
    const res = await axios.get(backend_url + 'api/todos')
    if (Array.isArray(res.data)) {
      setTodos(res.data)
      
    }else{
      console.warn("Not an array")
      setTodos([])
    }
  } catch (error) {
    console.log("error fetching todo" ,error)
    setTodos([])
  }
}

useEffect(() =>{
  fetchTodos()
},[])

const addTodo = () => {
    if (!text.trim()) return;
    axios.post(`${backend_url}api/todos`, { text })
      .then(res => {
        setTodos([...todos, res.data]);
        setText('');
      })
      .catch(err => console.error("Error adding todo:", err));
  };


const editTodoText = (id)=>{
  if(!editText.trim()) return
   axios.put(`${backend_url}api/todos/${id}` ,{
    text:editText
  })
  .then(res =>{
    setTodos(todos.map(todo => todo._id === id ? res.data :todo))
    setEditingTodo(null)
    setEditText("")
  })
  .catch(err =>console.log("Edit todo error",err))
}

 const deleteTodo = (id) =>{
  axios.delete(`${backend_url}api/todos/${id}`)
  .then(() => setTodos(todos.filter(todo => todo._id !== id)))
  console.log('delect')
}

const startEditing =(todo) =>{
  setEditingTodo(todo._id)
  setEditText(todo.text)
}

  return (
    <div className='bg-[#eeeeee] flex flex-1 flex-col items-center pt-5 w-full h-dvh'>
      <AddTodo text={text} setText={setText} addTodo={addTodo}/>
      <AllTodos todos={todos} editingTodo={editingTodo} setEditText={setEditText} editText={editText}editTodoText={editTodoText} setEditingTodo={setEditingTodo} startEditing={startEditing} deleteTodo={deleteTodo}/> 
      
    </div>
  )
}

export default App
