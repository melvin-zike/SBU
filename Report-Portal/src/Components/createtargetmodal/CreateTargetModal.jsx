import { useEffect, useState, useContext } from "react";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { AuthContext } from "../../context/authContext/AuthContext";

const CreateTargetModal = () => {
    const [targets, setTargets] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const {dispatch} = useContext(MovieContext);



    const handleChange = (e) => {
        const value = e.target.value;
        setTargets({...targets, [e.target.name]: value});
       
      };
    
      const handleSubmit =(e)=>{
        e.preventDefault();
             const userId = user._id;
            const targeting = {...targets, userId}
         createMovie(targeting, dispatch); 
         window.location.reload();
      }
    


  return (
    // {/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Report title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    <div class="modal-body">
      <div class="mb-3">
    <label for="targets" class="form-label">Description</label>
    <textarea class="form-control" id="targets" rows="3" name='desc'  onChange={handleChange}></textarea>
      </div>
     
      <select class="form-select" id='timeofcomplete' name='time' aria-label="Default select example" onChange={handleChange}>
      <option selected>Time Of Completion</option>
      <option value="1">Daily</option>
       <option value="2">Weekly</option>
       <option value="3">Monthly</option>
      </select>
      <hr />
      <select class="form-select" name='status' aria-label="Default select example" onChange={handleChange}>
      <option selected>Status</option>
       <option value="1">Ongoing</option>
      <option value="2">Completed</option>
      <option value="3">Yet To Commence</option>
      <option value="4">Terminated</option>
      </select>
       <hr />
      
     {/* ..................................................  */}
     
<div class="mb-3">
  <label for="achievement" class="form-label">Achievement Status</label>
  <textarea class="form-control" id="achievement" rows="3" name='achievements' onChange={handleChange}></textarea>
</div>
<div class="mb-3">
  <label for="suggestions" class="form-label">Suggestions/Challenges If Any</label>
  <textarea class="form-control" id="challenges" rows="3" name='suggestions' onChange={handleChange}></textarea>
</div>
<div class="mb-3">
  <label for="overallscore" class="form-label">overall Score</label>
  <input type="number" class="form-control" id="overallscore" placeholder="score" name='overallscore' onChange={handleChange}/>
</div>
<div class="mb-3">
  <label for="personalscore" class="form-label">Overall Score</label>
  <input type="number" class="form-control" id="personalscore" placeholder="personalscore" name='personalscore' onChange={handleChange}/>
</div>
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Save changes</button>
      </div>
    </div>
  </div>
</div>
  )
}

export default CreateTargetModal