import React, { useState } from 'react'

const Login = () => {
    const [currentState , setCurrentState] = useState('sing up')

  return (
<form>
    <div>
        <p>{currentState}</p>
        <hr />
    </div>
    
</form>
  )
}

export default Login