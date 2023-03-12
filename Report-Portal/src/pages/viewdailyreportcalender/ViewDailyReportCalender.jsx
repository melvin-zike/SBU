import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";
import Navbar from "../../Components/navbar/Navbar";
import Toggle from "../toggle/Toggle";
import { format } from "timeago.js";
import { Edit, Markunread, Save, Send } from "@material-ui/icons";
import ScoreForm from "../scorecard/ScoreForm";

const ViewDailyReportCalender = () => {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [reportday, setReportDay] = useState([]);
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState([]);
  const [edits, setEdits] = useState({});

  // 633158ce889639035eae548d userId

  //633158ce889639035eae548d calender

  //Score Cards

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const weekone = posts.filter(
    (rep) => rep.name === "Daily Report" && rep.time === id
  );

  //TOTAL SCORE LOGIC
  const fullname = reportday?.fullname;
  console.log(user);

  useEffect(() => {
    const fetchCalenders = async () => {
      try {
        const res = await axiosInstance.get("/reportday/find/" + id, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setReportDay(res.data);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchCalenders();
  }, [id, user?._id]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get("/reports/profile/" + fullname, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setPosts(res.data);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchPosts();
  }, [fullname, user?._id]);

  const handleDelete = (id) => {};

  return (
    <>
      <Navbar />
      <Toggle />
      <div class="page-wrapper">
        <div class="container-fluid">
          <h2>Report For {reportday.reportday}</h2>
          <div class="card">
            {/* <!-- Nav tabs --> */}

            {/* <!-- Tab panes --> */}
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  href="#week1"
                  role="tab"
                >
                  <span class="hidden-sm-up"></span>
                  <span class="hidden-xs-down">Daily Report</span>
                </a>
              </li>
            </ul>
            <div class="tab-content tabcontent-border">
              <div class="tab-pane p-20" id="week1" role="tabpanel">
                <div class="p-20">
                  {/* //FIRST TABLE  */}
                  <div class="card" data-bs-spy="scroll">
                    <div class="card-body" data-bs-spy="scroll">
                      <h4 class="card-title">My Reports</h4>
                    </div>
                    <div
                      class="comment-widgets scrollable "
                      style={{ height: "500px" }}
                    >
                      {/* <!-- Comment Row --> */}
                      {weekone.map((targets) => (
                        <div
                          class="d-flex scrollable flex-row comment-row mt-0"
                          key={targets._id}
                        >
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
                            {user ? (
                              <h6 class="font-medium">{user.fullname}</h6>
                            ) : (
                              <h6 class="font-medium">{reportday?.fullname}</h6>
                            )}

                            <span class="mb-3 d-block">
                              {targets.executivesummary}
                            </span>
                            <span class="mb-3 d-block">{targets.pictures}</span>
                            <div class="comment-footer">
                              <span class="text-muted float-end">
                                {format(targets.createdAt)}
                              </span>

                              <Link
                                className="links"
                                to={{
                                  pathname: `/single/${targets._id}`,
                                  targets: targets,
                                }}
                              >
                                <button
                                  type="button"
                                  class="btn btn-warning btn-sm text-white"
                                >
                                  View
                                </button>
                              </Link>
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

              {/* MONTHLY TABLE---------------------------------  */}
              <div class="tab-pane p-20" id="week5" role="tabpanel">
                <div class="p-20"></div>
              </div>
            </div>
          </div>
        </div>

        <footer class="footer text-center">
          All Rights Reserved by LoveWorld Publishing admin. Developed By
          Radulam Networks.
        </footer>
      </div>
    </>
  );
};

export default ViewDailyReportCalender;
