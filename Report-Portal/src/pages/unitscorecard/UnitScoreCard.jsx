import { useContext, useEffect, useState } from "react";
import './unitscorecrad.scss';
import axios from "axios";
import { AuthContext } from '../../context/authContext/AuthContext';
import { ListContext } from "../../context/listContext/ListContext";
import { createList } from "../../context/listContext/apiCalls";
import { useHistory } from "react-router-dom";

import Navbar from '../../Components/navbar/Navbar';

const UnitScoreCard = () => {
    const [list, setList] = useState(null);
    const [targets, setTargets] = useState([]);
    const { user } = useContext(AuthContext);
    const history = useHistory()
    const { dispatch } = useContext(ListContext);
    
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

            if(res.status === 200){
                setTargets(
                  res.data.sort((p1, p2) => {
                    return p2.updatedAt - p1.updatedAt;
                  })
          
                );
              }else{
                return 'NO TARGETS YET';
              }       
          
             } catch(err){
            // console.log(err);
          }
          
        };
        fetchPosts();
      }, [fullname, user?._id]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  console.log(list);
  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    // history.push("/lists")
  };



  return (
    <div>
        <Navbar />
   
    <div className="Container-fluid">

    <h1 className="addProductTitle">Generate Scorecards with Targets</h1>
    <form className="form-control">
      <div className="formLeft">
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Popular Movies"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
       <select className="form-select"  name='isMonthly' onChange={handleChange}>
        <option selected>Monthly Scorecard</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      
       </select>
         
        </div>
        <div className="addProductItem">
       <select className="form-select"  name='isWeekly' onChange={handleChange}>
        <option selected>Weekly Scorecard</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      
       </select>
         
        </div>
        {/* <div className="addProductItem">
          <label>Type</label>
          <select name="type" onChange={handleChange}>
            <option>Type</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
        </div> */}
      </div>
      <div className="formRight">
        <div className="addProductItem">
          <label>Content</label>
          <select
            multiple
            name="content"
            onChange={handleSelect}
            style={{ height: "280px" }}
          >
            {targets.map((target) => (
              
              <option key={target._id} value={targets._id}>
                  {target.name + " (new Target)"}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="addProductButton" onClick={handleSubmit}>
        Create
      </button>
    </form>
  </div>
  </div>
  )
}

export default UnitScoreCard