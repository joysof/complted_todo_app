import React from 'react'

const AddTodo = ({text,setText , addTodo}) => {
    console.log(text)
  return (
    <div>
        <div className='p-3 pb-5 rounded  w-[300px] sm:w-[500px] gap-4'>
         <h1 className='text-3xl text-center mb-10 '>Todo App</h1>

        <div className='flex items-center gap-6'>
        <input type="text" className='outline-none px-2 rounded-full w-[300px] h-[45px] bg-[#f7f7f7] ' placeholder='write Task hear' value={text} onChange={e => setText(e.target.value)}/>
        <button type='submit' className='  capitalize bg-blue-700 px-10 ms-2  py-1 rounded-full hover:bg-blue-600 text-white  h-[45px] ' onClick={addTodo}>add task</button>
        </div>
      </div>
    </div>
  )
}

export default AddTodo