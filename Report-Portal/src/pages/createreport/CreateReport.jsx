import { useContext, useEffect, useState } from "react";
import Navbar from '../../Components/navbar/Navbar'
import Sidebar from '../../Components/sidebar/Sidebar'
import { Link } from "react-router-dom";
import "./createreport.scss";
import storage from "../../firebase";
import { deleteTransaction } from "../../context/transactionContext/apiCalls";
import { TransactionContext } from "../../context/transactionContext/TransactionContext";
import Toggle from "../toggle/Toggle"
import { useHistory } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import { AuthContext } from '../../context/authContext/AuthContext';
import CreateReportModal from '../../Components/createreportmodal/CreateReportModal';


const CreateReport = () => {
  const {transactions, dispatch} = useContext(TransactionContext);
    const [list, setList] = useState(null);
  const history = useHistory()
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState([]);
  const [edits, setEdits] = useState({});
  
  console.log(edit)
  


  const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });
    
    const fullname = user?.fullname;
  useEffect(() => {
      const fetchPosts = async () => {
       
        try{
      
          const res = await axiosInstance.get("/reports/profile/" + fullname, {
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
      
          const res = await axiosInstance.get(`/reports/find/${edit}`, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          })
         
            setEdits(res.data)            
        
           } catch(err){
          console.log(err);
        }
        
      };
      fetchEdits();
    }, [edit]);
  
     const handleDelete = (id) => {
      deleteTransaction(id, dispatch)
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
            
            <CreateReportModal />

            <div class="card">
                <div class="card-body ">
                  <h4 class="card-title">My Reports</h4>
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
                          {targets.executivesummary}
                     </span>
                     <div class="comment-footer">
                       <span class="text-muted float-end">{format(targets.createdAt)}</span>

                       <Link className="links" to={{pathname: `/single/${targets._id}`, targets: targets}}>
                       <button
                         type="button"
                         class="btn btn-warning btn-sm text-white"
                       >
                         View
                       </button>
                       </Link >
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

export default CreateReport