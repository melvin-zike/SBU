import { useState, useEffect, useContext } from "react";
import axios from "axios";


const ModalForm = ({edits}) => {
  const [desc, setDesc] = useState('');
    const [time, setTime] = useState('');
    const [status, setStatus] = useState('');
    const [achievements, setAchievements] = useState('');
    const [suggestions, setSuggestions] = useState('');
    const [overallscore, setScore] = useState('');
    const [personalscore, setPersonalscore] = useState('');

     const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL
      });
      

    //HANDLE UPDATE CALL-------------------------------------------
    const handleUpdate = (id) => {
      try {
        const body = {
          desc: desc.current.value,
          time: time.current.value,
          status: status.current.value,
          achievements: achievements.current.value,
          suggestions: suggestions.current.value,
         overallscore: overallscore.current.value,
          personalscore: personalscore.current.value,
         
        };
        axiosInstance.put(`/targets/${id}`,  body, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
      } catch (err) {
          
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
                  
                    <div class="modal-body">
                    
                    <div class="mb-3">
              <label for="targets" class="form-label">Description</label>
              <textarea class="form-control" id="targets" rows="3" name='desc' placeholder={edits.desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                  </div>
                 
                  <select class="form-select" id='timeofcomplete' placeholder={edits.time} name='time' aria-label="Default select example" onChange={(e) => setTime(e.target.value)}>
                  <option selected>Time Of Completion</option>
                  <option value="1">weekly</option>
                   <option value="2">Monthly</option>
                  </select>
                  <hr />
                  <select class="form-select" name='status' value={edits.status} aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
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
              <textarea class="form-control" id="achievement" rows="3" name='achievements' value={edits.achievements} onChange={(e) => setAchievements(e.target.value)}></textarea>
            </div>
            <div class="mb-3">
              <label for="suggestions" class="form-label">Suggestions/Challenges If Any</label>
              <textarea class="form-control" id="challenges" rows="3" name='suggestions' value={edits.suggestions} onChange={(e) => setSuggestions(e.target.value)}></textarea>
            </div>
            <div class="mb-3">
              <label for="overallscore" class="form-label">Overall Score</label>
              <input type="number" class="form-control" id="overallscore" placeholder="score" name='overallscore' value={edits.overallscore} onChange={(e) => setScore(e.target.value)}/>
            </div>
            <div class="mb-3">
              <label for="personalscore" class="form-label">Overall Score</label>
              <input type="number" class="form-control" id="personalscore" placeholder="personalscore" value={edits.personalscore} name='personalscore' onChange={(e) => setPersonalscore(e.target.value)}/>
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