import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";
import { getMovies, deleteMovie } from "../../context/movieContext/apiCalls";

import { MovieContext } from "../../context/movieContext/MovieContext";
import ModalForm from "../modalform/ModalForm";
import { Delete, Visibility, WeekendTwoTone } from "@material-ui/icons";
import DeleteDialog from "../DeleteDialog";

const today = new Date();
const priorDate = new Date().setDate(today.getDate() - 3);
console.log(priorDate);

const MyTargets = () => {
  const { movies, dispatch } = useContext(MovieContext);
  const { user } = useContext(AuthContext);
  const [calender, setCalender] = useState([]);
  const [edit, setEdit] = useState([]);
  const [edits, setEdits] = useState({});

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const fullname = user?.fullname;
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get("/calender/profile/" + fullname, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setCalender(res.data);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchPosts();
  }, [fullname, user?._id]);

  //Edit form populated

  useEffect(() => {
    const fetchEdits = async () => {
      try {
        const res = await axiosInstance.get(`/carlender/find/${edit}`, {
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

  const handleEdit = (id) => {
    setEdit(id);
  };

  return (
    <div class="card">
      <div class="card-body ">
        <h4 class="card-title">Score Card's Calender</h4>
        <hr />
      </div>
      <div class="comment-widgets scrollable" style={{ height: "376px" }}>
        {/* <!-- Comment Row --> */}
        {calender.map((wen) => (
          <div
            class="d-flex scrollable flex-row comment-row mt-0"
            key={wen._id}
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
              <h6 class="font-medium">{user.username}</h6>
              <span class="mb-3 d-block">{wen.calender}</span>
              <div class="comment-footer">
                {calender.createdAt < priorDate ? (
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
                  to={{ pathname: `/viewcalender/${wen._id}`, wen: wen }}
                >
                  <button
                    type="button"
                    className="btn btn-primary btn-sm text-white"
                  >
                    View
                  </button>
                </Link>

                {/* <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  class="btn btn-danger mx-2 btn-sm text-white"
                >
                  <Delete />
                </button> */}
              </div>
            </div>

            {/* EDIT MODAL------------------------------------       */}
            {/* <DeleteDialog del={wen} /> */}
          </div>
        ))}
        {/* <ModalForm edits={edits} /> */}
      </div>
    </div>
  );
};

export default MyTargets;
