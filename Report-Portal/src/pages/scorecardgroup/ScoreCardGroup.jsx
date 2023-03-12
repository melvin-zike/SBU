import React from 'react'
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../context/authContext/AuthContext';
import Ticker from "react-ticker"
import ScoreCardGroupList from './ScoreCardGroupList';

const ScoreCardGroup = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const { user } = useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  useEffect(() => {
    const getRandomLists = async () => {
      try{
        const res = await axiosInstance.get(`http://localhost:4000/api/lists${type ? "?type=" + type : ""}`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
          },
        });
        setLists(res.data);
        console.log(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getRandomLists();
  }, [type, genre])
  
      
    return (
        <div className="weekly-challenge-page">
          
          <div className="challenge-weekly">
        
             {lists.map((list, index) => (  
        <ScoreCardGroupList  key={index} list={list}/>
      ))}
           
          </div>

        </div>
          
    )
}

export default ScoreCardGroup;

