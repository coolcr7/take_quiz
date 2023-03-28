import React from 'react'
import {useState,useEffect,useRef} from "react"

export default function FlashCard({flashCard}) {
  const [height,setHeight]=useState(200)
  const [flip,setFlip]=useState(false)
  const getFront=useRef()
  const getBack=useRef()
  const flipHandler=()=>{
    setFlip(!flip)
  }
  const getHeight=()=>{
    const front_height=getFront.current.getBoundingClientRect().height
    const back_height=getBack.current.getBoundingClientRect().height
    // console.log(front_height,back_height)
    setHeight(Math.max(front_height,back_height,200)  )
  }
  useEffect(()=>{
    window.addEventListener("resize",getHeight)
    return ()=>{window.removeEventListener("resize",getHeight)}
    // console.log(height)
  },[flashCard.question,flashCard.options])
  return (
    <div className={`card ${flip ?"flip":""}`} style={{height:height}}onClick={flipHandler}>
      <div className='front' ref={getFront}>
        {flashCard.question}
        <div className='options'>
          {flashCard.options.map((a,index)=>{return(
            <div className='option' key={index} >{a}</div>
          )})}
        </div>
      </div>
      <div className='back'  ref={getBack}>
        {flashCard.answer}
      </div>
    </div>
  )
}
