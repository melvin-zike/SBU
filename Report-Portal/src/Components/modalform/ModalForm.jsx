import { useState, useEffect, useContext } from "react";
import axios from "axios";


const ModalForm = ({edits}) => {
  const [desc, setDesc] = useState(edits.desc)
    const [time, setTime] = useState(edits.time);
    const [status, setStatus] = useState(edits.status);
    const [achievements, setAchievements] = useState(edits.achievements);
    const [suggestions, setSuggestions] = useState(edits.suggestions);
    const [overallscore, setScore] = useState(edits.overallscore);
    const [personalscore, setPersonalscore] = useState(edits.personalscore);

     const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL
      });
      
      console.log(edits);

    //HANDLE UPDATE CALL-------------------------------------------
    const handleUpdate = async (id) => {
      try {
        const body = {
          desc: desc,
          time: time,
          status: status,
          achievements: achievements,
          suggestions: suggestions,
         overallscore: overallscore,
          personalscore: personalscore,
         
        };
       await axiosInstance.put(`/targets/${id}`,  body, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
      } catch (err) {
          console.log(err);
      }
     
     
  
      // socket?.emit("sendNotification", {
      //   senderName:currentUser.username,
      //   receiverName:user.username,
      //   spec,
      // })
    };
  
    



  return (
   <>
     
     {/* // MODAL FORM---------------------------------------------------- */}
                    <div>
                    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Report</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  
                    <div class="modal-body" key ={edits._id}>
                    
                    <div class="mb-3">
              <label for="targets" class="form-label">Description</label>
             <textarea class="form-control" id="targets" rows="3" name='desc' onChange={(e) => setDesc(e.target.value)}>{edits.desc}</textarea>
             
                  </div>
                 
                  <select class="form-select" id='timeofcomplete' name='time' aria-label="Default select example" onChange={(e) => setTime(e.target.value)}>
                  <option selected>
                    {edits.time == 1 ? 'weekly' : 
                  edits.time == 2 ? 'Monthly' : ''}
                  </option>
                  <option value="1">weekly</option>
                   <option value="2">Monthly</option>
                  </select>
                  <hr />
                  <select class="form-select" name='status' aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                  <option selected>{
                  edits.status == 1 ? 'weekly' : 
                  edits.status == 2 ? 'Completed' :
                  edits.status == 3 ? 'Yet To Commence' :
                  edits.status == 4 ? 'Terminated' : ''
                  }</option>
                   <option value="1">Ongoing</option>
                  <option value="2">Completed</option>
                  <option value="3">Yet To Commence</option>
                  <option value="4">Terminated</option>
                  </select>
                   <hr />
                  
                 {/* ..................................................  */}
                 
            <div class="mb-3">
              <label for="achievement" class="form-label">Achievement Status</label>
              <textarea class="form-control" id="achievement" rows="3" name='achievements' onChange={(e) => setAchievements(e.target.value)}>{edits.achievements}</textarea>
            </div>
            <div class="mb-3">
              <label for="suggestions" class="form-label">Suggestions/Challenges If Any</label>
              <textarea class="form-control" id="challenges" rows="3" name='suggestions' onChange={(e) => setSuggestions(e.target.value)}>{edits.suggestions}</textarea>
            </div>
            <div class="mb-3">
              <label for="overallscore" class="form-label">Overall Score</label>
              <input type="number" class="form-control" id="overallscore"  name='overallscore' placeholder={edits.overallscore} onChange={(e) => setScore(e.target.value)}/>
            </div>
            <div class="mb-3">
              <label for="personalscore" class="form-label">Overall Score</label>
              <input type="number" class="form-control" id="personalscore"  placeholder={edits.personalscore} name='personalscore' onChange={(e) => setPersonalscore(e.target.value)}/>
            </div>
                      ...
                    </div>
                
                  
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => {handleUpdate(edits._id)}}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>
                </div>
   </>
  )
}

export default ModalForm