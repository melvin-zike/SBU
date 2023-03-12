import React from "react";
import { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";

const Todo = () => {
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [acknowledge, setAcknowledge] = useState(false);

  // const [edit, setEdit] = useState([]);
  // const [edits, setEdits] = useState({});

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const fullname = user?.fullname;
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await axiosInstance.get("/goals", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setGoals(
          res.data.sort((p1, p2) => {
            return p2 - p1;
          })
        );
      } catch (err) {
        // console.log(err);
      }
    };
    fetchGoals();
  }, [fullname, user?._id]);

  //Acknowdge Handler...............................
  const ackHandler = (id) => {
    const fullname = user.fullname;
    try {
      axiosInstance.put("/goals/" + id + "/acknowledge", fullname, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
    } catch (err) {}
  };

  return (
    <div>
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Notifications..</h4>
          <hr />
          <div class="todo-widget scrollable" style={{ height: "250px" }}>
            <ul
              class="list-task todo-list list-group mb-0"
              data-role="tasklist"
            >
              {goals.map((goal) => (
                <li
                  key={goal._id}
                  class="list-group-item todo-item"
                  data-role="task"
                >
                  <div class="d-flex flex-row comment-row mt-0">
                    <div class="comment-text w-100">
                      <h6 class="font-medium">Admin</h6>
                      <span class="mb-3 d-block">{goal.desc}</span>
                      <div class="comment-footer">
                        <span class="text-muted float-end">
                          <span class="text-muted float-end">
                            {format(goal.createdAt)}
                          </span>
                        </span>
                        {goal.acknowledge.includes(user.fullname) ? (
                          <button
                            type="button"
                            class="btn btn-success btn-sm text-white"
                          >
                            Acknowledged
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-danger btn-sm text-white"
                            onClick={ackHandler(goal._id)}
                          >
                            Acknowledge
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
