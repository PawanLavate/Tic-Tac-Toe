import React from 'react'
import TicTacToe2 from './Components/TicTacToe/TicTacToe2.jsx'
import TicTacToe from './Components/TicTacToe/TicTacToe.jsx'
import {Link,Route,Routes} from 'react-router-dom'
const App = () => {
  return (
    <div>
     <div className='flex h-10 w-full m-10 gap-10 justify-center bg-[#1f3540] text-white items-center'> 
     <Link to='/' >Single PLayer</Link>
     <Link to='/multiplayer'>Multi PLayer</Link>
     </div>

      <Routes>
        <Route path='/' element={<TicTacToe2/>}></Route>
        <Route path='/multiplayer' element={<TicTacToe/>}></Route>
      </Routes>
    </div>
  )
}

export default App