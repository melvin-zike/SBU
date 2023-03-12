import { useState, useEffect, useRef, useContext } from "react";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  Work,
} from "@material-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import "./profile.scss";
import { AuthContext } from "../../context/authContext/AuthContext";
import Navbar from "../../Components/navbar/Navbar";
import Sidebar from "../../Components/sidebar/Sidebar";

export default function Edit() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [erro, setErro] = useState("");
  const fullname = useRef();
  const email = useRef();
  const phone = useRef();

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleClick = async (id) => {
    const body = {
      fullname: fullname?.current.value,
      email: email?.current.value,
      phone: phone?.current.value,
      userId: user._id,
    };
    console.log(body);
    try {
      const res = await axiosInstance.put(`/users/${id}/updateuser`, body);

      if (res.status == 200) {
        console.log(res);
        //  Get the existing data
        let existing = localStorage.getItem("user");

        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        existing = existing ? JSON.parse(existing) : {};

        // // Add new data to localStorage Array
        existing["fullname"] = res.data.fullname;
        existing["email"] = res.data.email;
        existing["phone"] = res.data.phone;

        // Save back to localStorage
        localStorage.setItem("user", JSON.stringify(existing));
        console.log(res);

        // window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-users">
        <Sidebar />
        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">My Profile</h1>
          </div>
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img
                  src={
                    user.profilePic
                      ? user.profilePic
                      : PF + "profile/avatar.png"
                  }
                  alt=""
                  className="userShowImg"
                />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">{user.fullname}</span>
                  <span className="userShowUserTitle">{user.email}</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.fullname}</span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">{user._id}</span>
                </div>
                <div className="userShowInfo">
                  <Work className="userShowIcon" />
                  <span className="userShowInfoTitle">Angel Department</span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.phone}</span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.email}</span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.state}</span>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <span className="userUpdateTitle">Edit Your Info</span>

              {/* EDIT FORMS INFO----------------------  */}

              <div className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div class="container">
                    <div class="row justify-content-center">
                      <div class="">
                        <div class="row">
                          {/* <p className="success">{msg}</p>
              <p className="dangerous">{erro}</p> */}
                        </div>
                        <span>Full Name</span>
                        <div class="row align-items-center  mt-1">
                          <div class="col">
                            <input
                              type="text"
                              class="form-control"
                              ref={fullname}
                              placeholder={user.fullname}
                            />
                          </div>
                        </div>
                        <span>Email</span>
                        <div class="row align-items-center mt-1">
                          <div class="col">
                            <input
                              type="email"
                              class="form-control"
                              ref={email}
                              placeholder={user.email}
                            />
                          </div>
                        </div>
                        <span>Phone</span>
                        <div class="row align-items-center mt-1">
                          <div class="col">
                            <input
                              type="number"
                              ref={phone}
                              class="form-control"
                              placeholder={user.phone}
                            />
                          </div>
                        </div>

                        <div class="row justify-content-start mt-1">
                          <div class="col"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="userUpdateButton"
                    onClick={() => handleClick(user._id)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
