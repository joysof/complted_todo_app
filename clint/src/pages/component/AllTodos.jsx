import React from 'react'
import { MdOutlineDone } from 'react-icons/md';
import { MdModeEditOutline } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa6';

const AllTodos = ({todos , editingTodo ,setEditText , editText,editTodoText , setEditingTodo ,startEditing ,deleteTodo}) => {
  return (
    <div>
            <div>
        {
        
         todos.length === 0?(
            <div>
              <p className='bg-white mt-3 px-2 py-1 rounded '>No Todo</p>
            </div>
          ):<div className='w-[300px] sm:w-[500px]'>
            <h2 className='mt-2 capitalize text-blue-500'>All task list</h2>
              {
               Array.isArray(todos)&& todos.map((todo ,index 
                // index chinge kore todo._id devo porea
                ) =>(
                  <div key={index}>
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

export default AllTodos