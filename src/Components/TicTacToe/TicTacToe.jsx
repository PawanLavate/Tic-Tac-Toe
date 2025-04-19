import React, { useRef, useState } from 'react'
import './tictactoe.css'
import circle_icon from '../Assets/circle.png'
import cross_icon from '../Assets/cross.png'

var data=["" ,"" , "", "", "", "", "", "", ""]
const tictactoe = () => {
  const  [count,setCount]=useState(0)
  const [lock,setlock] =useState(false) ;
  const titlRef=useRef(null)
  let box1 = useRef(null) ;
  let box2 = useRef(null) ;
  let box3 = useRef(null) ;
  let box4 = useRef(null) ;
  let box5 = useRef(null) ;
  let box6 = useRef(null) ;
  let box7 = useRef(null) ;
  let box8 = useRef(null) ;
  let box9 = useRef(null) ;

  let box_array=[box1,box2,box3,box4,box5,box6,box7,box8,box9]
  const toggle =(e,num) => {
    if(lock){
      return 0 ;
    }
    if(count%2==0){
      e.target.innerHTML=`<img src=${cross_icon}>`
      data[num] ='x' ;
      setCount(count+1) ;
    }
    else{
      e.target.innerHTML=`<img src=${circle_icon}>`
      data[num] ='o' ;
      setCount(count+1) ;
    }
    checkWin() ;
  }
  const won =(winner) =>{
    setlock(true) ;
    if(winner==='x'){
      titlRef.current.innerHTML=`Congratulations :<img src=${cross_icon}>`
    }
    else{
      titlRef.current.innerHTML=`Congratulations :<img src=${circle_icon}>`
    }
  }
  const reset=()=>{
    setlock(false) ;
    data=["" ,"" ,"","","","","","",""] ;
    titlRef.current.innerHTML=`Toc tac toe In <span>React</span> `
    box_array.map((item)=>{
        item.current.innerHTML = `<img src=''>`
    })
    
  }
  const checkWin = ()=>{
    if(data[0]===data[1] && data[1]===data[2] && data[2]!=''){
      won(data[2]) ;
    }
    else if(data[3]===data[4] && data[4]===data[5] && data[5]!=''){
      won(data[5]) ;
    }
    else if(data[6]===data[7] && data[7]===data[8] && data[8]!=''){
      won(data[8]) ;
    }
    else if(data[0]===data[3] && data[3]===data[6] && data[6]!=''){
      won(data[6]) ;
    }
    else if(data[1]===data[4] && data[4]===data[7] && data[7]!=''){
      won(data[7]) ;
    }
    else if(data[2]===data[5] && data[5]===data[8] && data[8]!=''){
      won(data[8]) ;
    }
    else if(data[0]===data[4] && data[4]===data[8] && data[8]!=''){
      won(data[8]) ;
    }
    else if(data[2]===data[4] && data[4]===data[6] && data[6]!=''){
      won(data[6]) ;
    }
    
  }
  return (
    <div className='container'>
        <h1 className='title'ref={titlRef}>Toc tac toe In <span>React</span></h1>
        <div className="board">
          <div className="row1">
            <div className="box" ref={box1} onClick={(e)=>toggle(e,0)}></div>
            <div className="box" ref={box2} onClick={(e)=>toggle(e,1)}></div>
            <div className="box" ref={box3} onClick={(e)=>toggle(e,2)}></div>
          </div>
          <div className="row2">
          <div className="box" ref={box4} onClick={(e)=>toggle(e,3)}></div>
            <div className="box" ref={box5} onClick={(e)=>toggle(e,4)}></div>
            <div className="box" ref={box6} onClick={(e)=>toggle(e,5)}></div>
          </div>
          <div className="row3">
          <div className="box" ref={box7} onClick={(e)=>toggle(e,6)}></div>
            <div className="box" ref={box8} onClick={(e)=>toggle(e,7)}></div>
            <div className="box" ref={box9} onClick={(e)=>toggle(e,8)}></div>
          </div>
        </div>
        <div >
            <button className='reset' onClick={()=>reset()}>Reset</button>
        </div>
    </div>
  )
}

export default tictactoe