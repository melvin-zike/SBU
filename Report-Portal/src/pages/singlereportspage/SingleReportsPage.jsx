import { useEffect, useContext, useState,} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../../context/authContext/AuthContext';
import Navbar from "../../Components/navbar/Navbar";
import Toggle from "../toggle/Toggle";


const SingleReportsPage = () => {
    const {id} = useParams();
    const [text, setText] = useState('');
    const [reports, setReports ] = useState([]);
    const { user } = useContext(AuthContext);

    console.log(reports);

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
             
             } catch(err){
            // console.log(err);
          }
          
        };
        fetchReports();
      }, [id, user?._id]);

   //ADD COMMENTS
  const addComment = async () => {
    const credentials = {
      postId: id,
      userId: user._id,
      body: text
    }
    const res = await axiosInstance.put(`/reports/${id}/comments`, credentials, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log(res.data)
    window.location.reload();
  };


  return (
    <div>
        <Navbar />
        <Toggle />
    <div className="card mt-4">
        <h2>Report</h2>
              <div id="Toggle-1" className="collapse show multi-collapse">
            
              
              <p className="card-body widget-content">
              {reports.executivesummary}
                </p>
                <p className="card-body widget-content">
                {reports.achievements}
                {reports.testimonies}
                {reports.financialincrease}
                {reports.projections}
                <a href={reports.pictures}>Link to pictures</a>
                </p>
                
                <p className="card-body widget-content">
                  {reports.Conclusion}
                </p>
              </div>
              
              
             
            </div>

    <div className="mb-3">

      {/* PORTAL EDITS-------------------- */}
    <label htmlFor="personalscore" className="form-label">HOD's Comment</label>
     
      {reports.comments?.map((comment) => (
        <div className="text-danger mx-3" id="challenges" rows="3" name='comments' key={comment._id}>
           <i>{comment.body}</i>
           
        </div>
      ))}
    
      {user.isAdmin === true && 
      <div>
      <label htmlFor="personalscore" className="form-label">Comments</label>
      <textarea className="form-control" id="challenges" rows="3" name='comments' onChange={(e) => setText(e.target.value)}></textarea>
      <button className='btn btn-primary mt-2' onClick={addComment}>Comment</button>
      </div>
      }
  
        </div> 
</div>
  )
}

export default SingleReportsPage