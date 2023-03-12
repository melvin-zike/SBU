import { useEffect, useState, useContext } from "react";
import { createTransaction } from "../../context/transactionContext/apiCalls";
import { TransactionContext } from "../../context/transactionContext/TransactionContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import axios from "axios";

const CreateReportModal = () => {
  const [reports, setReports] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(TransactionContext);
  const [reportdays, setReportDays] = useState([]);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setReports({ ...reports, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = user._id;
    const onereports = { ...reports, fullname };
    const reporting = { ...onereports, userId };
    createTransaction(reporting, dispatch);
    //  window.location.reload();
  };

  // GEt Dates of targets
  const fullname = user?.fullname;
  useEffect(() => {
    const fetchReportDays = async () => {
      try {
        const res = await axiosInstance.get(`/reportday/profile/${fullname}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setReportDays(res.data);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchReportDays();
  }, [fullname, user?._id]);

  return (
    // {/* <!-- Modal --> */}
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Report Form
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <select
                class="form-select my-2"
                id="timeofcomplete"
                name="time"
                aria-label="Default select example"
                onChange={handleChange}
              >
                <option selected>Time Of Completion</option>
                {reportdays.map((wen) => (
                  <option value={wen._id}>{wen.reportday}</option>
                ))}
                {/* <option value="2">Weekly</option>
                <option value="3">Monthly</option> */}
              </select>
            </div>
            <div class="mb-3">
              <label htmlFor="targets" class="form-label">
                Executive Summary
              </label>
              <textarea
                class="form-control"
                id="targets"
                rows="3"
                name="executivesummary"
                onChange={handleChange}
              ></textarea>
            </div>
            <hr />
            {/* ..................................................  */}
            <div class="mb-3">
              <label htmlFor="achievement" class="form-label">
                Achievements for the month in relation to goals
              </label>
              <textarea
                class="form-control"
                id="achievement"
                rows="3"
                name="achievements"
                onChange={handleChange}
              ></textarea>
            </div>
            <div class="mb-3">
              <label htmlFor="suggestions" class="form-label">
                Testimonies and other achievements
              </label>
              <textarea
                class="form-control"
                id="challenges"
                rows="3"
                name="testimonies"
                onChange={handleChange}
              ></textarea>
            </div>
            <div class="mb-3">
              <label htmlFor="overallscore" class="form-label">
                Financial and Numerical Increase
              </label>
              <textarea
                class="form-control"
                id="challenges"
                rows="3"
                name="financialincrease"
                onChange={handleChange}
              ></textarea>
            </div>
            <div class="mb-3">
              <select
                class="form-select"
                name="name"
                aria-label="Default select example"
                onChange={handleChange}
              >
                <option selected>TITLE</option>
                <option value="FIRST WEEK">FIRST WEEK</option>
                <option value="SECOND WEEK">SECOND WEEK</option>
                <option value="THIRD WEEK">THIRD WEEK</option>
                <option value="FORTH WEEK">FORTH WEEK</option>
              </select>
            </div>
            <div class="mb-3">
              <label htmlFor="personalscore" class="form-label">
                projection for the coming Month
              </label>
              <textarea
                class="form-control"
                id="challenges"
                rows="3"
                name="projections"
                onChange={handleChange}
              ></textarea>
            </div>
            <div class="mb-3">
              <label htmlFor="personalscore" class="form-label">
                Conclusion
              </label>
              <textarea
                class="form-control"
                id="challenges"
                rows="3"
                name="Conclusion"
                onChange={handleChange}
              ></textarea>
            </div>
            ...
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleSubmit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReportModal;
