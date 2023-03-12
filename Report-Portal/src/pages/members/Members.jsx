import React from "react";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import { getUsers, deleteUser } from "../../context/userContext/apiCalls";

import { UserContext } from "../../context/userContext/UserContext";
import Navbar from "../../Components/navbar/Navbar";

const Members = () => {
  const { users, dispatch } = useContext(UserContext);
  const { data, setData } = useState([]);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);
  console.log(users);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  return (
    <div>
      <Navbar />
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Members Info</h5>
          <div class="table-responsive">
            <table id="zero_config" class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Unit</th>
                  <th>Location</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {users.map((dat) => (
                  <tr>
                    <td>{dat.fullname}</td>
                    <td>{dat.email}</td>
                    <td>{dat.phone}</td>
                    <td>
                      {dat.unit == 1
                        ? "Admin"
                        : dat.unit == 2
                        ? "External Partners"
                        : dat.unit == 3
                        ? "Angel Global Call Center"
                        : dat.unit == 4
                        ? "RBIM & LWPM"
                        : dat.unit == 5
                        ? "ROR SBU RLM TEAM B UNIT 4"
                        : dat.unit == 6
                        ? "ROR SBU RLM TEAM B UNIT 5"
                        : dat.unit == 8
                        ? "Lagos UK/Office"
                        : dat.unit == 9
                        ? "Performance Mangement"
                        : dat.unit == 10
                        ? "Human Resources"
                        : dat.unit == 11
                        ? "Media"
                        : dat.unit == 12
                        ? "Finance"
                        : ""}
                    </td>
                    <td>{dat.location}</td>
                    <td>
                      {dat.adminrights == 1
                        ? "Collating Officer (UNIT HEAD)"
                        : dat.adminrights == 2
                        ? "Perfomance Manger"
                        : dat.adminrights == 3
                        ? "HOD"
                        : dat.adminrights == 4
                        ? "HOP"
                        : dat.adminrights == 5
                        ? "Member"
                        : ""}
                    </td>
                    <td>
                      <Link
                        className="links"
                        to={{
                          pathname: `/daily-report/${dat.fullname}`,
                          dat: dat,
                        }}
                      >
                        <button
                          className=""
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            border: "none",
                          }}
                        >
                          View Daily Report
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="links"
                        to={{
                          pathname: `/create-report/${dat.fullname}`,
                          dat: dat,
                        }}
                      >
                        <button
                          className=""
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            border: "none",
                          }}
                        >
                          View Reports
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="links"
                        to={{
                          pathname: `/members-scorecard/${dat.fullname}`,
                          dat: dat,
                        }}
                      >
                        <button
                          className=""
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            border: "none",
                          }}
                        >
                          View ScoreCards
                        </button>
                      </Link>
                    </td>
                    <td>
                      <DeleteOutline
                        className="userListDelete"
                        onClick={() => handleDelete(dat._id)}
                        style={{ color: "red" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
