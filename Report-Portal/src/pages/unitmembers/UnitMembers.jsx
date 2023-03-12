import React from "react";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import { getUsers, deleteUser } from "../../context/userContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { UserContext } from "../../context/userContext/UserContext";
import Navbar from "../../Components/navbar/Navbar";

const UnitMembers = () => {
  const { users, dispatch } = useContext(UserContext);
  const { data, setData } = useState([]);
  const { user } = useContext(AuthContext);
  // const members = users.map().filter(dat => dat.adminrights == users.daminright)
  const members = users.filter((number) => number.unit == user.unit);

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
          <h5 class="card-title">
            {user.unit == 1
              ? "Production/Logistics "
              : user.unit == 2
              ? "External Partners "
              : user.unit == 3
              ? "Angel Global Call Center "
              : user.unit == 4
              ? "RBIM & LWPM "
              : user.unit == 5
              ? "ROR SBU RLM TEAM B UNIT 4 "
              : user.unit == 6
              ? "ROR SBU RLM TEAM B UNIT 5 "
              : user.unit == 8
              ? "Lagos UK/Office "
              : user.unit == 9
              ? "Performance Mangement"
              : user.unit == 10
              ? "Human Resources "
              : ""}
            Members' Info
          </h5>
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
                {members.map((dat) => (
                  <tr>
                    <td>{dat.fullname}</td>
                    <td>{dat.email}</td>
                    <td>{dat.phone}</td>
                    <td>
                      {dat.unit == 1
                        ? "Production/Logistics"
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
                        : dat.unit == 7
                        ? "Lagos UK/Office"
                        : dat.unit == 8
                        ? "Performance Mangement"
                        : dat.unit == 9
                        ? "Human Resources"
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

export default UnitMembers;
