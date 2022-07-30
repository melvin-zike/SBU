import { useEffect, useContext, useState,} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../../context/authContext/AuthContext';
import Navbar from "../../Components/navbar/Navbar";
import Toggle from "../toggle/Toggle";


const SingleReportsPage = () => {
    const {id} = useParams();
    const [reports, setReports ] = useState([]);
    const { user } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL
      });


    useEffect(() => {
        const fetchReports = async () => {
         
          try{
        
            const res = await axiosInstance.get("/reports/find/" + id, {
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
        fetchReports();
      }, [id, user?._id]);




  return (
    <div>
        <Navbar />
        <Toggle />
    <div class="card mt-4">
        <h2>Report</h2>
              <div id="Toggle-1" class="collapse show multi-collapse">
            
              
              <p class="card-body widget-content">
              {reports.executivesummary}
                </p>
                <p class="card-body widget-content">
                {reports.achievements}
                {reports.testimonies}
                {reports.financialincrease}
                {reports.projections}
                <a href={reports.pictures}>Link to pictures</a>
                </p>
                
                <p class="card-body widget-content">
                  {reports.Conclusion}
                </p>
              </div>
              
              
             
            </div>

    <div class="mb-3">
  <label for="personalscore" class="form-label">HOD Comments</label>
  <textarea class="form-control" id="challenges" rows="3" name='comments'></textarea>
  <button className='btn btn-primary mt-2'>Comment</button>
        </div> 
</div>
  )
}

export default SingleReportsPage