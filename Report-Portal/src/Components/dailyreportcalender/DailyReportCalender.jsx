import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";
import { getUsers, deleteUser } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import { Delete, Visibility, WeekendTwoTone } from "@material-ui/icons";

const today = new Date();
const priorDate = new Date().setDate(today.getDate() - 3);
console.log(priorDate);

const DailyReportCalender = () => {
  const { users, dispatch } = useContext(UserContext);
  const { user } = useContext(AuthContext);
  const { fullname } = useParams();
  const [reportdays, setReportDays] = useState([]);
  const [edit, setEdit] = useState([]);
  const [edits, setEdits] = useState({});

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);
  console.log(users);

  // const fullname = user?.fullname;

  useEffect(() => {
    const fetchReportDays = async () => {
      try {
        const res = await axiosInstance.get("/reportday/profile/" + fullname, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setReportDays(res.data);
        console.log(res.data);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchReportDays();
  }, [fullname, user?._id]);

  //Edit form populated

  useEffect(() => {
    const fetchEdits = async () => {
      try {
        const res = await axiosInstance.get(`/reportday/find/${edit}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setEdits(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEdits();
  }, [edit]);

  const handleDelete = (id) => {};

  return (
    <div class="card">
      <div class="card-body ">
        <h4 class="card-title">Report's Calender</h4>
        <hr />
      </div>
      <div class="comment-widgets scrollable" style={{ height: "376px" }}>
        {/* <!-- Comment Row --> */}
        {reportdays.map((wen) => (
          <div
            class="d-flex scrollable flex-row comment-row mt-0"
            key={wen._id}
          >
            {wen.duration === 6 ? (
              <>
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
                  {/* //LOGIC  */}

                  <h6 class="font-medium">{user.username}</h6>
                  <span class="mb-3 d-block">{wen.reportday2}</span>
                  <div class="comment-footer">
                    {reportdays.createdAt < priorDate ? (
                      <span class="text-red text-muted float-end">
                        {format(wen.createdAt)}
                      </span>
                    ) : (
                      <span class="text-muted float-end">
                        {format(wen.createdAt)}
                      </span>
                    )}

                    <Link
                      className="links"
                      to={{
                        pathname: `/viewdailyreportcalender/${wen._id}`,
                        wen: wen,
                      }}
                    >
                      <button
                        type="button"
                        className="btn btn-primary btn-sm text-white"
                      >
                        <Visibility />
                        View
                      </button>
                    </Link>

                    {/*<button
                  type="button"
                  class="btn btn-danger mx-2 btn-sm text-white"
                  onClick={() => handleDelete(wen._id)}
                >
                  Delete
                </button> */}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {/* EDIT MODAL------------------------------------       */}
          </div>
        ))}
        {/* <ModalForm edits={edits} /> */}
      </div>
    </div>
  );
};

export default DailyReportCalender;
