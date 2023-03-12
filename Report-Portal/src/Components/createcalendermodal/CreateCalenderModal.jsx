import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import axios from "axios";

const CreateCalenderModal = () => {
  const [calender, setCalender] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setCalender({ ...calender, [e.target.name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const userId = user._id;
    const fullname = user.fullname;
    const onebody = { ...calender, fullname };
    const body = { ...onebody, userId };
    try {
      const res = await axiosInstance.post("/calender", body, {
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
      id="datesModal"
      tabindex="-1"
      aria-labelledby="datesModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="datesModalLabel">
              Dates Form
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
              <label for="dates" class="form-label">
                Dates
              </label>
              <input
                class="form-control"
                id="dates"
                rows="3"
                name="calender"
                onChange={handleChange}
              />
            </div>
            <hr />
            {/* ..................................................  */}
            <select
              class="form-select"
              name="duration"
              aria-label="Default select example"
              onChange={handleChange}
            >
              <option selected>Time</option>
              <option value="1">First Week</option>
              <option value="2">Second Week</option>
              <option value="3">Third Week</option>
              <option value="4">Forth Week</option>
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

export default CreateCalenderModal;
