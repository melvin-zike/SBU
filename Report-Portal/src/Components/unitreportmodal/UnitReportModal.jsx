import { useEffect, useState, useContext } from "react";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { AuthContext } from "../../context/authContext/AuthContext";

const UnitReportModal = () => {
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
        <h5 class="modal-title" id="exampleModalLabel">Report Form</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    <div class="modal-body">
     <div class="mb-3">
    <label for="targets" class="form-label">Executive Summary</label>
    <textarea class="form-control" id="targets" rows="3" name='execsummary'  onChange={handleChange}></textarea>
     </div>
      <hr />
      
     {/* ..................................................  */}
     
<div class="mb-3">
  <label for="achievement" class="form-label">Achievements for the month in relation to goals</label>
  <textarea class="form-control" id="achievement" rows="3" name='achievements' onChange={handleChange}></textarea>
</div>
<div class="mb-3">
  <label for="suggestions" class="form-label">Testimonies and other achievements</label>
  <textarea class="form-control" id="challenges" rows="3" name='testimonies' onChange={handleChange}></textarea>
</div>
<div class="mb-3">
  <label for="overallscore" class="form-label">Financial and Numerical Increase</label>
  <textarea class="form-control" id="challenges" rows="3" name='financial' onChange={handleChange}></textarea>
</div>
<div class="mb-3">
  <label for="personalscore" class="form-label">Pictures and links to videos</label>
  <textarea class="form-control" id="challenges" rows="3" name='imagesandlinks' onChange={handleChange}></textarea>
</div>
<div class="mb-3">
  <label for="personalscore" class="form-label">projection for the coming Month</label>
  <textarea class="form-control" id="challenges" rows="3" name='projections' onChange={handleChange}></textarea>
</div>
<div class="mb-3">
  <label for="personalscore" class="form-label">Conclusion</label>
  <textarea class="form-control" id="challenges" rows="3" name='conclusion' onChange={handleChange}></textarea>
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

export default UnitReportModal