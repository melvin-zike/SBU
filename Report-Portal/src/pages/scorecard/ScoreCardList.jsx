import React from "react";
import { useContext, useEffect, useState } from "react";
import "./scorecard.scss";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";
import Ticker from "react-ticker";

// import LazyLoad from "react-lazyload";
// import Skeleton from "../skelecton/Skeleton";
// import { AuthContext } from '../../context/authContext/AuthContext';

import ScoreCardItem from "./ScoreCardItem";
import { Edit, Markunread, Save, Send } from "@material-ui/icons";
import ScoreForm from "./ScoreForm";

const ScoreCardList = ({ type }) => {
  // const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [reports, setReports] = useState([0]);
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const fullname = user.fullname;

  // TOTAL PERSONAL SCORE-----

  const addition = reports?.map((tot) => {
    return tot?.personalscore;
  });

  const total = addition?.reduce((a, b) => {
    return a + b;
  });

  // TOTAL OVERALL SCORE----
  const addition1 = reports.map((tot1) => {
    return tot1.overallscore;
  });

  const total1 = addition1.reduce((a, b) => {
    return a + b;
  });

  const addition2 = reports.map((tot2) => {
    return tot2.achievedscore;
  });

  const total2 = addition2.reduce((a, b) => {
    return a + b;
  });

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axiosInstance.get(
          `http://localhost:4000/api/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user"))?.accessToken,
            },
          }
        );

        // console.log(res)
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get("/targets/profile/" + fullname, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        if (res.data == "") {
          setReports([{ name: "no reports yet" }]);
        } else {
          setReports(res.data);
        }
      } catch (err) {
        // console.log(err);
      }
    };
    fetchPosts();
  }, [fullname, user?._id]);

  const handleform = () => {
    setOpen(open == false ? true : false);
  };

  return (
    <div className="card">
      <div className="card-container">
        <Ticker className="ticker-container" mode="smooth">
          {({ index }) => (
            <>
              <p className="challenge-ticker">
                Win our prestigious staff of the month award...{" "}
              </p>
            </>
          )}
        </Ticker>

        <h1 className="scorecardowner">{user.fullname}'s SCORE CARD</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Target Assigned To Staff</th>
              <th scope="col">Time For Completion</th>
              <th scope="col">
                Status (
                <i style={{ color: "red" }}>
                  indicate completed, in progress, yet to commence, terminated
                </i>
                )
              </th>
              <th scope="col">
                Achievement Status (
                <i style={{ color: "red" }}>
                  kindly provide details of actual performance till date{" "}
                </i>
                )
              </th>
              <th scope="col">Suggestions/Challenges If Any</th>
              <th scope="col">OveraLL Posible Score</th>
              <th scope="col">Personal Score</th>
              <th scope="col">
                Achieved Score(
                <i style={{ color: "red" }}>for the head of deapartment</i>)
                {user.isAdmin == true ||
                user.adminrights == 1 ||
                user.adminrights == 2 ||
                user.adminrights == 3 ||
                user.adminrights == 4 ? (
                  <Edit onClick={handleform} />
                ) : (
                  ""
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <th className="headrow" scope="row">
                  -
                </th>
                <td className="bg-primary firstrow">
                  <p>{report.desc}</p>
                </td>
                <td>
                  {report.time == 1
                    ? "Daily"
                    : report.time == 2
                    ? "Weekly"
                    : report.time == 3
                    ? "Monthly"
                    : ""}
                </td>
                <td>
                  {report.status == 1
                    ? "Ongoing"
                    : report.status == 2
                    ? "Completed"
                    : report.status == 3
                    ? "Yet To Commence"
                    : report.status == 3
                    ? "Terminated"
                    : ""}
                </td>
                <td className="bg-success firstrow">{report.achievements}</td>
                <td className="bg-warning firstrow">{report.suggestions}</td>
                <td>{report.overallscore}</td>
                <td>{report.personalscore}</td>
                <td>
                  {report.achievedscore}
                  {open == true ? <ScoreForm reps={report} /> : ""}
                </td>
              </tr>
            ))}
          </tbody>

          <br />
          <hr />

          <tbody>
            <tr>
              <th className="headrow" scope="row">
                -
              </th>
              <td className="bg-primary firstrow">
                <p>-----</p>
              </td>
              <td>-----</td>
              <td>-----</td>
              <td className="bg-success firstrow">-----</td>
              <td className="bg-warning firstrow">Total</td>
              <td>{total1}</td>
              <td>{total}</td>
              <td>{total2}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreCardList;
