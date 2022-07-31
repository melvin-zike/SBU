import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import axios from "axios";
const CreateGoalsModal = () => {
    const [goals, setGoals] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
   
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });


    const handleChange = (e) => {
        const value = e.target.value;
        setGoals({...goals, [e.target.name]: value});
       
      };
    
      const handleClick = async (e) => {
        e.preventDefault();
          const userId = user._id;
          const body = {...goals, userId};
          try {
            const res = await axiosInstance.post("/goals", body, {
              headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
              },
            } );
            if(res.status == 200){
              console.log(res.data);
              window.location.reload()
              // history.push("/login");
            }
             
           
          } catch (err) {}
      };
    
    


  return (
   // {/* <!-- Modal --> */}
<div class="modal fade" id="goalsModal" tabindex="-1" aria-labelledby="goalsModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="goalsModalLabel">Todo Form</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    <div class="modal-body">
     <div class="mb-3">
    <label for="targets" class="form-label">Description</label>
    <textarea class="form-control" id="targets" rows="3" name='desc'  onChange={handleChange}></textarea>
     </div>
      <hr />
      
     {/* ..................................................  */}
     <select class="form-select" name='duration' aria-label="Default select example" onChange={handleChange}>
      <option selected>Duration</option>
       <option value="1">Today</option>
      <option value="2">1week</option>
      <option value="3">2 Weeks</option>
      <option value="5">1 Month</option>
      <option value="6">Every Day</option>
      </select>
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>
  )
}

export default CreateGoalsModal