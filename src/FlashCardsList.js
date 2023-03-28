import React from 'react'
import FlashCard from "./FlashCard"

export default function FlashCardsList({flashData}) {
 console.log(flashData)
  return (
    <div className='flash-grid'>
      {flashData.map(flashCard=>{
        return(
        <FlashCard flashCard={flashCard} key={flashCard.id} />
        )
      })}
    </div>
  )
}
