import { useEffect, useContext, useState,} from "react";
import {useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from '../../context/authContext/AuthContext';
import Navbar from "../../Components/navbar/Navbar";
import Toggle from "../toggle/Toggle";
import Sidebar from "../../Components/sidebar/Sidebar";
import UnitReportModal from "../../Components/unitreportmodal/UnitReportModal";
import {getMovies, deleteMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";


const ReportsPage = () => {
    const {fullname} = useParams();
    const {movies, dispatch} = useContext(MovieContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const [reports, setReports ] = useState([]);
    const [singleuser, setSingleUser ] = useState({});

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL
      });


    useEffect(() => {
        const fetchReports = async () => {
         
          try{
        
            const res = await axiosInstance.get("/reports/profile/" + fullname, {
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
      }, [fullname, user?._id]);

      //Get Users by username
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?fullname=${fullname}`, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setSingleUser(res.data);
      console.log(res.data)
    };
    fetchUser();
  }, [fullname]);

      const handleDelete = (id) => {
        deleteMovie(id, dispatch)
        window.location.reload();
       };

  return (
    <div>
        <Navbar />
        <Toggle />
        <div className="main">
        <Sidebar />
        <div className="createProduct">
        <div class="col-md-6 col-lg-2 col-xlg-3 ">
              <div class="card card-hover" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="box bg-cyan text-center">
                  <h1 class="font-light text-white">
                    <i class="mdi mdi-pencil" ></i>
                  </h1>
                  <h6 class="text-white">Create Reports</h6>

                  {/* MODAL---------------- */}
                
                </div>
              </div>
            </div>
            
            <UnitReportModal />

            <div class="card">
                <div class="card-body ">
                  <h4 class="card-title">{singleuser.fullname}'s Reports</h4>
                </div>
                <div class="comment-widgets scrollable" style={{height: "500px"}}>
                  {/* <!-- Comment Row --> */}
                 {reports.map((targets ) =>(
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
                          {targets.executivesummary}
                     </span>
                     <div class="comment-footer">
                       <span class="text-muted float-end">{format(targets.createdAt)}</span>
                       <Link className="links" to={{pathname: `/single/report/${targets._id}`, targets: targets}}>
                       <button
                         type="button"
                         class="btn btn-warning btn-sm text-white"
                       >
                         View
                       </button>
                       </Link>
                       
                       <button
                         type="button"
                         class="btn btn-danger btn-sm text-white"
                         onClick={() => handleDelete(targets._id)}
                       >
                         Delete
                       </button>
                     </div>
                   </div>

                   
                   </div>
                
                 ))}

              
     </div>
</div>
       </div>

        </div>
       
    </div>
  )
}

export default ReportsPage