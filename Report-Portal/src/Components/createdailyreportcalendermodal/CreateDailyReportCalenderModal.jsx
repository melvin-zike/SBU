import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import axios from "axios";

const CreateDailyReportCalenderModal = () => {
  const [reportdays, setReportDays] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setReportDays({ ...reportdays, [e.target.name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const userId = user._id;
    const fullname = user.fullname;
    const onebody = { ...reportdays, fullname };
    const body = { ...onebody, userId };
    try {
      const res = await axiosInstance.post("/reportday", body, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      if (res.status == 200) {
        console.log(res.data);
        window.location.reload();
        // history.push("/login");
      }
    } catch (err) {}
  };

  return (
    // {/* <!-- Modal --> */}
    <div
      class="modal fade"
      id="reportcalenderModal"
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
              <label for="targets" class="form-label">
                Name
              </label>
              <input
                class="form-control"
                placeholder="e.g: AUGUST 2022"
                id="targets"
                rows="3"
                name="reportday2"
                onChange={handleChange}
              />
            </div>
            {/* <div class="mb-3">
              <label for="targets" class="form-label">
                Day
              </label>
              <input
                class="form-control"
                placeholder="e.g: OCT 1st 2022"
                id="targets"
                rows="3"
                name="reportday"
                onChange={handleChange}
              />
            </div> */}
            <select
              class="form-select"
              name="duration"
              aria-label="Default select example"
              onChange={handleChange}
            >
              <option selected>Type</option>
              <option value="6">Daily Report</option>
            </select>
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
              onClick={handleClick}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDailyReportCalenderModal;
