import React from 'react'
import { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import axios from "axios";
import { AuthContext } from '../../context/authContext/AuthContext';
import {getMovies, deleteMovie } from "../../context/movieContext/apiCalls";

import { MovieContext } from "../../context/movieContext/MovieContext";
import ModalForm from '../modalform/ModalForm';

const today = new Date() 
const priorDate = new Date().setDate(today.getDate() - 3) 
console.log(priorDate);

const MyTargets = () => {
    const {movies, dispatch} = useContext(MovieContext);
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [edit, setEdit] = useState([]);
    const [edits, setEdits] = useState({});
    


    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL
      });
      
      const fullname = user?.fullname;
    useEffect(() => {
        const fetchPosts = async () => {
         
          try{
        
            const res = await axiosInstance.get("/targets/profile/" + fullname, {
              headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
              },
            })
           
              setPosts(res.data)            
          
             } catch(err){
            // console.log(err);
          }
          
        };
        fetchPosts();
      }, [fullname, user?._id]);


      //Edit form populated

      useEffect(() => {
        const fetchEdits = async () => {
         
          try{
        
            const res = await axiosInstance.get(`/targets/find/${edit}`, {
              headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
              },
            })
           
              setEdits(res.data);
              console.log(res.data);            
          
             } catch(err){
            console.log(err);
          }
          
        };
        fetchEdits();
      }, [edit]);
    
       const handleDelete = (id) => {
        deleteMovie(id, dispatch)
        window.location.reload();
       };

       const handleEdit = (id) => {
       setEdit(id);
       };

  return (
    <div class="card">
                <div class="card-body ">
                  <h4 class="card-title">My Reports</h4>
                  <hr />
                </div>
                <div class="comment-widgets scrollable" style={{height: "500px"}}>
                  {/* <!-- Comment Row --> */}
                 {posts.map((targets ) =>(
                    <div class="d-flex scrollable flex-row comment-row mt-0" key={targets._id}>
                    <div>
                        <div class="p-2">
                                      <img
                                        src="../assets/images/users/1.jpg"
                                        alt="user"
                                        width="50"
                                        class="rounded-circle"
                                      />
                                    </div>
                    </div>
                     <div class="comment-text w-100">
                     <h6 class="font-medium">{user.username}</h6>
                     <span class="mb-3 d-block">
                          {targets.desc}
                     </span>
                     <div class="comment-footer">
                      {targets.createdAt < priorDate ? <span class="text-red text-muted float-end">{format(targets.createdAt)}</span> 
                      :
                      <span class="text-muted float-end">{format(targets.createdAt)}</span>
                      }
                      
                       <button
                         type="button"
                         class="btn btn-warning btn-sm text-white"
                         data-bs-toggle="modal" data-bs-target="#editModal"
                         onClick={() => handleEdit(targets._id)}
                       >
                         Edit
                       </button>
                       
                       <button
                         type="button"
                         class="btn btn-danger btn-sm text-white"
                         onClick={() => handleDelete(targets._id)}
                       >
                         Delete
                       </button>
                     </div>
                   </div>

                   
                {/* EDIT MODAL------------------------------------       */}
                  
                   </div>
                
                 ))}
    <ModalForm edits={edits}/>
     </div>
</div>


    
  )
}

export default MyTargets