import React from 'react'
import Navbar from '../../Components/navbar/Navbar'
import ScoreCardList from './ScoreCardList';


const ScoreCard = ({type}) => {


  return (
    <div>
        <Navbar />
     
    <ScoreCardList type={type} />
     </div>
  
  )
}

export default ScoreCard;