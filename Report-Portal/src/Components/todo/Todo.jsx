import React from 'react'
import { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import axios from "axios";
import { AuthContext } from '../../context/authContext/AuthContext';


const Todo = () => {

  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
    // const [edit, setEdit] = useState([]);
    // const [edits, setEdits] = useState({});


    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });
    
    const fullname = user?.fullname;
  useEffect(() => {
      const fetchGoals = async () => {
       
        try{
      
          const res = await axiosInstance.get("/goals/profile/" + fullname, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          })
         
            setGoals(res.data)            
        
           } catch(err){
          // console.log(err);
        }
        
      };
      fetchGoals();
    }, [fullname, user?._id]);
  
    


  return (
    <div>
        <div class="card">
                <div class="card-body">
                  <h4 class="card-title">To Do List/Goals</h4>
                  <hr />
                  <div class="todo-widget scrollable" style={{height: "250px"}}>
                    <ul
                      class="list-task todo-list list-group mb-0"
                      data-role="tasklist"
                    >
                      {goals.map((goal) => (
                        <li key= {goal._id} class="list-group-item todo-item" data-role="task">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="customCheck"
                          />
                          <label
                            class="form-check-label w-100 mb-0 todo-label"
                            for="customCheck"
                          >
                            <span class="todo-desc fw-normal">{goal.desc}.</span>
                           
                            <button class="badge rounded-pill bg-danger float-end">Delete</button>
                          </label>
                        </div>
                      
                      </li>
                      ))}
                      
                     
                        </ul>
                      
                  </div>
                </div>
              </div>
    </div>
  )
}

export default Todo