import React from 'react'
import { useContext, useEffect, useState } from "react";
import "./scorecard.scss";
import axios from "axios";
import { AuthContext } from '../../context/authContext/AuthContext';
import Ticker from "react-ticker"

// import LazyLoad from "react-lazyload";
// import Skeleton from "../skelecton/Skeleton";
// import { AuthContext } from '../../context/authContext/AuthContext';

import ScoreCardItem from './ScoreCardItem';


const ScoreCardList = ({type}) => {
    // const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);
    const [reports, setReports] = useState([]);
    const { user } = useContext(AuthContext);
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });
  
    const fullname = user.fullname;
  
    useEffect(() => {
      const getRandomLists = async () => {
        try{
          const res = await axiosInstance.get(`http://localhost:4000/api/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : "" }`, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
            },
          });
          // console.log(res)
          setLists(res.data)
        }catch(err){
          console.log(err);
        }
      }
      getRandomLists();
    }, [type, genre])
    
  
    useEffect(() => {
      const fetchPosts = async () => {
       
        try{
      
          const res = await axiosInstance.get("/targets/profile/" + fullname, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          })
         
            setReports(res.data)   
            console.log(res.data);         
        
           } catch(err){
          // console.log(err);
        }
        
      };
      fetchPosts();
    }, [fullname, user?._id]);
    
  
    
    
    return (
        <div className='card'>
        <div className='card-container'>
        <Ticker className='ticker-container' mode="smooth">
             {({ index }) => (
               <>
               <p className='challenge-ticker'>Vote your favorite Mictok Upcoming artist... </p>
               </>
             )

             }
           </Ticker>
          
  <h1 className='scorecardowner'>{user.fullname}'s SCORE CARD</h1>
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
                <th scope="col">Achieved Score(<i style={{color: 'red'}}>for the head of deapartment</i>)</th>
        </tr>
     </thead>
    <tbody>
       
       {reports.map((report) => (
              <tr key = {report.id}>
                <th className='headrow' scope="row">-</th>
                <td className='bg-primary firstrow'><p>{report.desc}</p></td>
                <td>{report.time == 1 ? 'Daily' : report.time == 2 ? 'Weekly' : report.time == 3 ? 'Monthly' : ''}</td>
                <td>{report.status == 1 ? 'Ongoing' : report.status == 2 ? 'Completed' : report.status == 3 ? 'Yet To Commence' : report.status == 3 ? 'Terminated' : ''}</td>
                <td className='bg-success firstrow'>{report.achievements}</td>
                <td className='bg-warning firstrow'>{report.suggestions}</td>
                <td>{report.overallscore}</td>
                <td>{report.personalscore}</td>
              </tr>
            
            ))}
       
  
    </tbody>
  </table>
         
        </div>
        </div>
    )
}

export default ScoreCardList
