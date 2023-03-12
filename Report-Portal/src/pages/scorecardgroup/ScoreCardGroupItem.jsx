import React from 'react';
import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef} from "react";
import { MusicNote,  Add, Remove,  ThumbUp, BugReportTwoTone, Visibility, } from "@material-ui/icons";
import axios from "axios";
import { AuthContext } from '../../context/authContext/AuthContext';
import ScoreForm from '../scorecard/ScoreForm';

const ScoreCardGroupItem = ({item, user}) => {
    const [playing, setPlaying] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const videoRef2 = useRef(null);
    const { user: currentUser } = useContext(AuthContext);
    const [challenges, setChallenges] = useState({});
    const [credits, setCredits] = useState(5);
    const [amount, setAmount] = useState(10);
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });

    //get movies
    useEffect(() => {
      const getChallenges = async () => {
        try{
          const res = await axiosInstance.get('http://localhost:4000/api/targets/find/' + item, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
            },
          });
          // console.log(res)
          setChallenges(res.data)
          console.log(res.data);
        }catch(err){
          console.log(err);
        }
      };
      getChallenges();
    }, [item])
    console.log(challenges);


  
   
  return (
      <>
       
     <div className="challenge-post">
     {/* <h1 className='scorecardowner'>{user.fullname}'s SCORE CARD</h1> */}
     <h3>{challenges.name}</h3>
<table class="table">
     <thead>
       <tr>
                <th scope="col">S/N</th>
                <th scope="col">Target Assigned To Staff</th>
                <th scope="col">Time For Completion</th>
                <th scope="col">Status (<i style={{color: 'red'}}>indicate completed, in progress, yet to commence, terminated</i>)</th>
                <th scope="col">Achievement Status (<i style={{color: 'red'}}>kindly provide details of actual performance till date </i>)</th>
                <th scope="col">Suggestions/Challenges If Any</th>
                <th scope="col">OveraLL Posible Score</th>
                <th scope="col">Personal Score</th>
                <th scope="col">Achieved Score(<i style={{color: 'red'}}>for the head of deapartment</i>)
                {/* {user.isAdmin == true ? <Edit onClick={handleform}/> : ''} */}
                </th>
        </tr>
     </thead>
    <tbody>
       
              <tr>
                <th className='headrow' scope="row">-</th>
                <td className='bg-primary firstrow'><p>{challenges.desc}</p></td>
                <td>{challenges.time == 1 ? 'Daily' : challenges.time == 2 ? 'Weekly' : challenges.time == 3 ? 'Monthly' : ''}</td>
                <td>{challenges.status == 1 ? 'Ongoing' : challenges.status == 2 ? 'Completed' : challenges.status == 3 ? 'Yet To Commence' : challenges.status == 3 ? 'Terminated' : ''}</td>
                <td className='bg-success firstrow'>{challenges.achievements}</td>
                <td className='bg-warning firstrow'>{challenges.suggestions}</td>
                <td>{challenges.overallscore}</td>
                <td>{challenges.personalscore}</td>
                <td>{challenges.achievedscore}
                {/* {
                open == true ? 
                <ScoreForm reps={challenges}/>
                 : ''} */}
                </td>
                
              </tr>
    </tbody>

<br />
<hr />

<tbody>
              <tr>
                <th className='headrow' scope="row">-</th>
                <td className='bg-primary firstrow'><p>-----</p></td>
                <td>-----</td>
                <td>-----</td>
                <td className='bg-success firstrow'>-----</td>
                <td className='bg-warning firstrow'>Total</td>
                {/* <td>{total1}</td>
                <td>{total}</td>
                <td>{total2}</td> */}
              </tr>
    </tbody>


  </table>
             
      </div>
               
      
      </>
      
  )
};

export default ScoreCardGroupItem;
