
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
    const res = await axios.get("http://localhost:5000/api/todos")
    setTodos(res.data)
  } catch (error) {
    console.log("error fetching todo" ,error)
  }
}

useEffect(() =>{
  fetchTodos()
},[])

const addTodo = () => {
    if (!text.trim()) return;
    axios.post(`http://localhost:5000/api/todos`, { text })
      .then(res => {
        setTodos([...todos, res.data]);
        setText('');
      })
      .catch(err => console.error("Error adding todo:", err));
  };

  // const updateTodo = (id , completed) =>{
  //   axios.put(`http://localhost:5000/api/todos/${id}` , {completed:!completed})
  //   .then(res => {
  //     setTodos(todos.map(todo => todo._id ===id ? res.data : todo))
  //   })
  //   .catch(err =>console.log("update todo error" ,err))
  // }
const editTodoText = (id)=>{
  if(!editText.trim()) return
   axios.put(`http://localhost:5000/api/todos/${id}` ,{
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
  axios.delete(`http://localhost:5000/api/todos/${id}`)
  .then(() => setTodos(todos.filter(todo => todo._id !== id)))
}

const startEditing =(todo) =>{
  setEditingTodo(todo._id)
  setEditText(todo.text)
}

  return (
    <div className='bg-blue-400 flex flex-1 flex-col items-center pt-5 w-full h-dvh'>
      <div className='p-3 pb-5 bg-white border rounded  shadow w-[300px] sm:w-[400px]'>
         <h1 className='text-3xl text-center mb-10 text-blue-400'>Todo App</h1>

        <input type="text" className='border-b-2 border-blue-400 outline-none pl-2' placeholder='Enter a Todo' value={text} onChange={e => setText(e.target.value)}/>
        <button type='submit' className='  capitalize bg-blue-400 px-6 ms-2  py-1 rounded hover:bg-blue-600 text-white' onClick={addTodo}>add</button>
      </div>
      <div>
        {
          todos.length === 0?(
            <div>
              <p className='bg-white w-[300px] sm:w-[400px] mt-3 px-2 py-1 rounded '>No Todo</p>
            </div>
          ):<div>
              {
                todos.map((todo) =>(
                  <div key={todo._id}>
                    { editingTodo === todo._id ? (
                      <div className='flex'>
                        <input type="text"className='bg-white py-2 rounded pl-2 mt-3 w-[300px] sm:w-[400px]' value={editText} onChange={(e) =>setEditText(e.target.value)}/>
                        <div className='ml-[-60px] mt-3 flex gap-3'>
                          <button onClick={()=>editTodoText(editingTodo)}><MdOutlineDone/></button>
                          <button onClick={()=>{setEditingTodo(null) ;setEditText('')}}><IoClose/></button>
                        </div>
                      </div>
                      
                    ):(
                     <div className='flex justify-center items-center'>
                      <span className='bg-white py-2 rounded pl-2 mt-3 w-[300px] sm:w-[400px]'>{todo.text}
                      </span>
                      <div className='ml-[-60px] mt-3 flex gap-3'>
                        <button className=' ' onClick={()=>startEditing(todo)}><MdModeEditOutline/></button>
                          <button className='' onClick={()=>deleteTodo(todo._id)}><FaTrash/></button>
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
