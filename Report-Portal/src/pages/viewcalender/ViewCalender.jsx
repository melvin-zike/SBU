import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";
import Navbar from "../../Components/navbar/Navbar";
import Toggle from "../toggle/Toggle";
import { Edit, Markunread, Save, Send } from "@material-ui/icons";
import ScoreForm from "../scorecard/ScoreForm";

const ViewCalender = () => {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [calender, setCalender] = useState([]);
  const { user } = useContext(AuthContext);

  //Score Cards
  const [reports, setReports] = useState([0]);
  const [open, setOpen] = useState(false);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  //SEPERATING EACH WEEK

  const weekone = reports.filter(
    (rep) => rep.name == "FIRST WEEK" && rep.time == id
  );
  const weektwo = reports.filter(
    (rep2) => rep2.name == "SECOND WEEK" && rep2.time == id
  );
  const weekthree = reports.filter(
    (rep3) => rep3.name == "THIRD WEEK" && rep3.time == id
  );
  const weekfour = reports.filter(
    (rep4) => rep4.name == "FORTH WEEK" && rep4.time == id
  );

  //TOTAL SCORE LOGIC
  const fullname = calender?.fullname;

  // TOTAL PERSONAL SCORE-----

  const addition = reports?.map((tot) => {
    return tot?.personalscore;
  });

  const total = addition?.reduce((a, b) => a + b, 0);

  // TOTAL OVERALL SCORE----
  const addition1 = reports.map((tot1) => {
    return tot1.overallscore;
  });

  const total1 = addition1.reduce((a, b) => a + b, 0);

  const addition2 = reports.map((tot2) => {
    return tot2.achievedscore;
  });

  const total2 = addition2.reduce((a, b) => a + b, 0);

  // TOTAL OVERALL SCORE FOR EACH WEEK----
  //    WEEK ONE
  const weekonepscores = weekone.map((weekonepscore) => {
    return weekonepscore.personalscore;
  });

  const total3 = weekonepscores.reduce((a, b) => a + b, 0);

  const weekoneoscores = weekone.map((weekoneoscore) => {
    return weekoneoscore.overallscore;
  });

  const total4 = weekoneoscores.reduce((a, b) => a + b, 0);

  const weekoneascores = weekone.map((weekoneascore) => {
    return weekoneascore.achievedscore;
  });

  const total5 = weekoneascores.reduce((a, b) => a + b, 0);

  //    //   WEEK TWO
  const weektwooscores = weektwo.map((weektwooscore) => {
    return weektwooscore.overallscore;
  });

  const total6 = weektwooscores.reduce((a, b) => a + b, 0);

  const weektwopscores = weektwo.map((weektwopscore) => {
    return weektwopscore.personalscore;
  });

  const total7 = weektwopscores.reduce((a, b) => a + b, 0);

  const weektwoascores = weektwo.map((weektwoascore) => {
    return weektwoascore.achievedscore;
  });

  const total8 = weektwoascores.reduce((a, b) => a + b, 0);
  //    //   WEEK THREE
  const weekthreeoscores = weekthree.map((weekthreeoscore) => {
    return weekthreeoscore.overallscore;
  });

  const total9 = weekthreeoscores.reduce((a, b) => a + b, 0);

  const weekthreepscores = weekthree.map((weekthreepscore) => {
    return weekthreepscore.personalscore;
  });

  const total10 = weekthreepscores.reduce((a, b) => a + b, 0);
  const weekthreeascores = weekthree.map((weekthreeascore) => {
    return weekthreeascore.achievedscore;
  });

  const total11 = weekthreeascores.reduce((a, b) => a + b, 0);

  //    //   WEEK FORTH
  const weekfouroscores = weekfour.map((weekfouroscore) => {
    return weekfouroscore.overallscore;
  });

  const total12 = weekfouroscores.reduce((a, b) => a + b, 0);

  const weekfourpscores = weekfour.map((weekfourpscore) => {
    return weekfourpscore.personalscore;
  });

  const total13 = weekfourpscores.reduce((a, b) => a + b, 0);
  const weekfourascores = weekfour.map((weekfourascore) => {
    return weekfourascore.achievedscore;
  });

  const total14 = weekfourascores.reduce((a, b) => a + b, 0);

  const handleform = () => {
    setOpen(open == false ? true : false);
  };

  //FETCH ALL TARGETS
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

  useEffect(() => {
    const fetchCalenders = async () => {
      try {
        const res = await axiosInstance.get("/calender/find/" + id, {
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
    fetchCalenders();
  }, [id, user?._id]);

  return (
    <>
      <Navbar />
      <Toggle />
      <div class="page-wrapper">
        <div class="container-fluid">
          <h2>
            {calender.fullname}' Score Card For {calender.calender}
          </h2>
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
                  <span class="hidden-xs-down">WEEK 1</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  href="#week2"
                  role="tab"
                >
                  <span class="hidden-sm-up"></span>
                  <span class="hidden-xs-down">WEEK 2</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  href="#week3"
                  role="tab"
                >
                  <span class="hidden-sm-up"></span>
                  <span class="hidden-xs-down">WEEK 3</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  href="#week4"
                  role="tab"
                >
                  <span class="hidden-sm-up"></span>
                  <span class="hidden-xs-down">WEEK 4</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  href="#week5"
                  role="tab"
                >
                  <span class="hidden-sm-up"></span>
                  <span class="hidden-xs-down">MONTHLY SCORECARD</span>
                </a>
              </li>
            </ul>
            <div class="tab-content tabcontent-border">
              <div class="tab-pane p-20" id="week1" role="tabpanel">
                <div class="p-20">
                  {/* //FIRST TABLE  */}
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">S/N</th>
                        <th scope="col">Target Assigned To Staff</th>
                        <th scope="col">Time For Completion</th>
                        <th scope="col">
                          Status (
                          <i style={{ color: "red" }}>
                            indicate completed, in progress, yet to commence,
                            terminated
                          </i>
                          )
                        </th>
                        <th scope="col">
                          Achievement Status (
                          <i style={{ color: "red" }}>
                            kindly provide details of actual performance till
                            date{" "}
                          </i>
                          )
                        </th>
                        <th scope="col">Suggestions/Challenges If Any</th>
                        <th scope="col">OveraLL Posible Score</th>
                        <th scope="col">Personal Score</th>
                        <th scope="col">
                          Achieved Score(
                          <i style={{ color: "red" }}>
                            for the head of deapartment
                          </i>
                          )
                          {user.isAdmin == true || user.adminrights === 1 ? (
                            <Edit onClick={handleform} />
                          ) : (
                            ""
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {weekone.map((one) => (
                        <tr key={one._id}>
                          <th className="headrow" scope="row">
                            -
                          </th>
                          <td className="bg-primary firstrow">
                            <p>{one.desc}</p>
                          </td>
                          <td>
                            {one.time == 1
                              ? "Daily"
                              : one.time == 2
                              ? "Weekly"
                              : one.time == 3
                              ? "Monthly"
                              : ""}
                          </td>
                          <td>
                            {one.status == 1
                              ? "Ongoing"
                              : one.status == 2
                              ? "Completed"
                              : one.status == 3
                              ? "Yet To Commence"
                              : one.status == 3
                              ? "Terminated"
                              : ""}
                          </td>
                          <td className="bg-success firstrow">
                            {one.achievements}
                          </td>
                          <td className="bg-warning firstrow">
                            {one.suggestions}
                          </td>
                          <td>{one.overallscore}</td>
                          <td>{one.personalscore}</td>
                          <td>
                            {one.achievedscore}
                            {open == true ? <ScoreForm reps={one} /> : ""}
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
                        <td>{total4}</td>
                        <td>{total3}</td>
                        <td>{total5}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECOND TABLEEEE-------  */}

              <div class="tab-pane p-20" id="week2" role="tabpanel">
                <div class="p-20">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">S/N</th>
                        <th scope="col">Target Assigned To Staff</th>
                        <th scope="col">Time For Completion</th>
                        <th scope="col">
                          Status (
                          <i style={{ color: "red" }}>
                            indicate completed, in progress, yet to commence,
                            terminated
                          </i>
                          )
                        </th>
                        <th scope="col">
                          Achievement Status (
                          <i style={{ color: "red" }}>
                            kindly provide details of actual performance till
                            date{" "}
                          </i>
                          )
                        </th>
                        <th scope="col">Suggestions/Challenges If Any</th>
                        <th scope="col">OveraLL Posible Score</th>
                        <th scope="col">Personal Score</th>
                        <th scope="col">
                          Achieved Score(
                          <i style={{ color: "red" }}>
                            for the head of deapartment
                          </i>
                          )
                          {user.isAdmin == true || user.adminrights === 1 ? (
                            <Edit onClick={handleform} />
                          ) : (
                            ""
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {weektwo.map((two) => (
                        <tr key={two._id}>
                          <th className="headrow" scope="row">
                            -
                          </th>
                          <td className="bg-primary firstrow">
                            <p>{two.desc}</p>
                          </td>
                          <td>
                            {two.time == 1
                              ? "Daily"
                              : two.time == 2
                              ? "Weekly"
                              : two.time == 3
                              ? "Monthly"
                              : ""}
                          </td>
                          <td>
                            {two.status == 1
                              ? "Ongoing"
                              : two.status == 2
                              ? "Completed"
                              : two.status == 3
                              ? "Yet To Commence"
                              : two.status == 3
                              ? "Terminated"
                              : ""}
                          </td>
                          <td className="bg-success firstrow">
                            {two.achievements}
                          </td>
                          <td className="bg-warning firstrow">
                            {two.suggestions}
                          </td>
                          <td>{two.overallscore}</td>
                          <td>{two.personalscore}</td>
                          <td>
                            {two.achievedscore}
                            {open == true ? <ScoreForm reps={two} /> : ""}
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
                        <td>{total6}</td>
                        <td>{total7}</td>
                        <td>{total8}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* THIRD TABLEEEE----------------------------  */}

              <div class="tab-pane p-20" id="week3" role="tabpanel">
                <div class="p-20">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">S/N</th>
                        <th scope="col">Target Assigned To Staff</th>
                        <th scope="col">Time For Completion</th>
                        <th scope="col">
                          Status (
                          <i style={{ color: "red" }}>
                            indicate completed, in progress, yet to commence,
                            terminated
                          </i>
                          )
                        </th>
                        <th scope="col">
                          Achievement Status (
                          <i style={{ color: "red" }}>
                            kindly provide details of actual performance till
                            date{" "}
                          </i>
                          )
                        </th>
                        <th scope="col">Suggestions/Challenges If Any</th>
                        <th scope="col">OveraLL Posible Score</th>
                        <th scope="col">Personal Score</th>
                        <th scope="col">
                          Achieved Score(
                          <i style={{ color: "red" }}>
                            for the head of deapartment
                          </i>
                          )
                          {user.isAdmin == true || user.adminrights === 1 ? (
                            <Edit onClick={handleform} />
                          ) : (
                            ""
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {weekthree.map((three) => (
                        <tr key={three._id}>
                          <th className="headrow" scope="row">
                            -
                          </th>
                          <td className="bg-primary firstrow">
                            <p>{three.desc}</p>
                          </td>
                          <td>
                            {three.time == 1
                              ? "Daily"
                              : three.time == 2
                              ? "Weekly"
                              : three.time == 3
                              ? "Monthly"
                              : ""}
                          </td>
                          <td>
                            {three.status == 1
                              ? "Ongoing"
                              : three.status == 2
                              ? "Completed"
                              : three.status == 3
                              ? "Yet To Commence"
                              : three.status == 3
                              ? "Terminated"
                              : ""}
                          </td>
                          <td className="bg-success firstrow">
                            {three.achievements}
                          </td>
                          <td className="bg-warning firstrow">
                            {three.suggestions}
                          </td>
                          <td>{three.overallscore}</td>
                          <td>{three.personalscore}</td>
                          <td>
                            {three.achievedscore}
                            {open == true ? <ScoreForm reps={three} /> : ""}
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
                        <td>{total9}</td>
                        <td>{total10}</td>
                        <td>{total11}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* FORTH TABLE-----------------------------------------  */}
              <div class="tab-pane p-20" id="week4" role="tabpanel">
                <div class="p-20">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">S/N</th>
                        <th scope="col">Target Assigned To Staff</th>
                        <th scope="col">Time For Completion</th>
                        <th scope="col">
                          Status (
                          <i style={{ color: "red" }}>
                            indicate completed, in progress, yet to commence,
                            terminated
                          </i>
                          )
                        </th>
                        <th scope="col">
                          Achievement Status (
                          <i style={{ color: "red" }}>
                            kindly provide details of actual performance till
                            date{" "}
                          </i>
                          )
                        </th>
                        <th scope="col">Suggestions/Challenges If Any</th>
                        <th scope="col">OveraLL Posible Score</th>
                        <th scope="col">Personal Score</th>
                        <th scope="col">
                          Achieved Score(
                          <i style={{ color: "red" }}>
                            for the head of deapartment
                          </i>
                          )
                          {user.isAdmin == true || user.adminrights === 1 ? (
                            <Edit onClick={handleform} />
                          ) : (
                            ""
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {weekfour.map((four) => (
                        <tr key={four._id}>
                          <th className="headrow" scope="row">
                            -
                          </th>
                          <td className="bg-primary firstrow">
                            <p>{four.desc}</p>
                          </td>
                          <td>
                            {four.time == 1
                              ? "Daily"
                              : four.time == 2
                              ? "Weekly"
                              : four.time == 3
                              ? "Monthly"
                              : ""}
                          </td>
                          <td>
                            {four.status == 1
                              ? "Ongoing"
                              : four.status == 2
                              ? "Completed"
                              : four.status == 3
                              ? "Yet To Commence"
                              : four.status == 3
                              ? "Terminated"
                              : ""}
                          </td>
                          <td className="bg-success firstrow">
                            {four.achievements}
                          </td>
                          <td className="bg-warning firstrow">
                            {four.suggestions}
                          </td>
                          <td>{four.overallscore}</td>
                          <td>{four.personalscore}</td>
                          <td>
                            {four.achievedscore}
                            {open == true ? <ScoreForm reps={four} /> : ""}
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
                        <td>{total12}</td>
                        <td>{total13}</td>
                        <td>{total14}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MONTHLY TABLE---------------------------------  */}
              <div class="tab-pane p-20" id="week5" role="tabpanel">
                <div class="p-20">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">S/N</th>
                        <th scope="col">Target Assigned To Staff</th>
                        <th scope="col">Time For Completion</th>
                        <th scope="col">
                          Status (
                          <i style={{ color: "red" }}>
                            indicate completed, in progress, yet to commence,
                            terminated
                          </i>
                          )
                        </th>
                        <th scope="col">
                          Achievement Status (
                          <i style={{ color: "red" }}>
                            kindly provide details of actual performance till
                            date{" "}
                          </i>
                          )
                        </th>
                        <th scope="col">Suggestions/Challenges If Any</th>
                        <th scope="col">OveraLL Posible Score</th>
                        <th scope="col">Personal Score</th>
                        <th scope="col">
                          Achieved Score(
                          <i style={{ color: "red" }}>
                            for the head of deapartment
                          </i>
                          )
                          {user.isAdmin == true || user.adminrights === 1 ? (
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
                          <td className="bg-success firstrow">
                            {report.achievements}
                          </td>
                          <td className="bg-warning firstrow">
                            {report.suggestions}
                          </td>
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

export default ViewCalender;
