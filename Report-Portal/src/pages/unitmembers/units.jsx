import React from 'react'
import { Link } from "react-router-dom";
import { DeleteOutline } from '@material-ui/icons';
import { useState, useEffect, useContext } from "react";
import {getUsers, deleteUser } from "../../context/userContext/apiCalls";

import { UserContext } from "../../context/userContext/UserContext";
import Navbar from '../../Components/navbar/Navbar';
import UnitMembers from './UnitMembers';


const Units = () => {
    const {users, dispatch} = useContext(UserContext);
    const {data, setData} = useState([]);
  
    useEffect(() => {
      getUsers(dispatch);
     }, [dispatch]);
     console.log(users);

  return (
    <div>
        <Navbar />
        <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Unit Members Info</h5>
                  <div class="table-responsive">
                    <table
                      id="zero_config"
                      class="table table-striped table-bordered"
                    >
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Unit</th>
                          <th>Location</th>
                          <th>Position</th>
                        </tr>
                      </thead>
                      <tbody>
                       {users.map((dat) => (
                        <UnitMembers dat={dat}/>
                       ))}     
                        
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Name</th>
                          <th>Position</th>
                          <th>Office</th>
                          <th>Age</th>
                          <th>Start date</th>
                          <th>Salary</th>
                        </tr>
                      </tfoot>
                    </table>
                    </div>
                    </div></div>
    </div>
  )
}

export default Units;