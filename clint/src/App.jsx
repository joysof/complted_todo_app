
import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';
import { MdOutlineDone } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { MdModeEditOutline } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa6';
import {IoClipboardOutline} from 'react-icons/io5'

function App() {
const [todos , setTodos] = useState([])
const [text , setText] = useState("")
const [editText , setEditText] = useState('')
const [editingTodo , setEditingTodo] = useState('')

const fetchTodos = async () =>{
  try {
<<<<<<< HEAD
    const res = await axios.get("http://localhost:5000/api/todos")
    if (Array.isArray(res.data)) {
      setTodos(res.data)
      
    }else{
      console.warn("Not an array")
      setTodos([])
    }
=======
    const res = await axios.get("https://complted-todo-app-backend.onrender.com/api/todos")
    setTodos(res.data)
>>>>>>> ca6029d4f6c68c21682ecf23f64613c0aa141528
  } catch (error) {
    console.log("error fetching todo" ,error)
    setTodos([])
  }
}

useEffect(() =>{
  fetchTodos()
},[])
console.log(todos)
const addTodo = () => {
    if (!text.trim()) return;
    axios.post(`https://complted-todo-app-backend.onrender.com/api/todos`, { text })
      .then(res => {
        setTodos([...todos, res.data]);
        setText('');
      })
      .catch(err => console.error("Error adding todo:", err));
  };


const editTodoText = (id)=>{
  if(!editText.trim()) return
   axios.put(`https://complted-todo-app-backend.onrender.com/api/todos/${id}` ,{
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
  axios.delete(`https://complted-todo-app-backend.onrender.com/api/todos/${id}`)
  .then(() => setTodos(todos.filter(todo => todo._id !== id)))
}

const startEditing =(todo) =>{
  setEditingTodo(todo._id)
  setEditText(todo.text)
}

  return (
    <div className='bg-[#eeeeee] flex flex-1 flex-col items-center pt-5 w-full h-dvh'>
      <div className='p-3 pb-5 rounded  w-[300px] sm:w-[500px] gap-4'>
         <h1 className='text-3xl text-center mb-10 '>Todo App</h1>

        <div className='flex items-center gap-6'>
        <input type="text" className='outline-none px-2 rounded-full w-[300px] h-[45px] bg-[#f7f7f7] ' placeholder='write Task hear' value={text} onChange={e => setText(e.target.value)}/>
        <button type='submit' className='  capitalize bg-blue-700 px-10 ms-2  py-1 rounded-full hover:bg-blue-600 text-white  h-[45px] ' onClick={addTodo}>add task</button>
        </div>
      </div>
      <div>
        {
        
          todos.length === 0?(
            <div>
              <p className='bg-white mt-3 px-2 py-1 rounded '>No Todo</p>
            </div>
          ):<div className='w-[300px] sm:w-[500px]'>
            <h2 className='mt-2 capitalize text-blue-500'>All task list</h2>
              {
                todos.map((todo) =>(
                  <div key={todo._id}>
                    { editingTodo === todo._id ? (
                      <div className='flex'>
                        <input type="text" className='outline-none py-2 rounded mt-3 w-[300px] sm:w-[500px] pl-2  bg-[#f7f7f7]' value={editText} onChange={(e) =>setEditText(e.target.value)}/>
                        <div className=' bg-[#f7f7f7] pr-3 mt-3 flex items-center justify-center  gap-3'>
                          <button className='bg-[#b5dafc] rounded-lg w-8 h-8  flex items-center justify-center' onClick={()=>editTodoText(editingTodo)}> <MdOutlineDone/></button>
                          <button className='bg-red-200 w-8 h-8 rounded-lg items-center justify-center flex' onClick={()=>{setEditingTodo(null) ;setEditText('')}}><FaTrash/></button>
                        </div>
                      </div>
                      
                    ):(
                     <div className='flex justify-center items-center'>
                      <span className='bg-[#f7f7f7] py-2 rounded pl-2 mt-3 w-[300px] sm:w-[500px]'>{todo.text}
                      </span>
                      <div className='mt-3 bg-[#f7f7f7] flex items-center justify-center pr-3 py-1 gap-3'>
                        <button className='bg-[#b5dafc] h-8 w-8 flex justify-center items-center rounded-lg' onClick={()=>startEditing(todo)}><MdModeEditOutline/></button>
                          <button className='bg-red-200 h-8 w-8 flex justify-center items-center rounded-lg' onClick={()=>deleteTodo(todo._id)}><FaTrash/></button>
                      </div>
                      <div>
                      
                      </div>
                     </div> 
                    )

                    }
                  </div>
                ))
              }
          </div>
        }
      </div>
      
    </div>
  )
}

export default App
