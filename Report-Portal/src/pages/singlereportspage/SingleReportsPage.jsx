import { useEffect, useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";
import Navbar from "../../Components/navbar/Navbar";
import Toggle from "../toggle/Toggle";

const SingleReportsPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [text, setText] = useState("");
  const [reports, setReports] = useState([]);
  const { user } = useContext(AuthContext);
  const [imputing, setIsImputing] = useState("");

  console.log(reports);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axiosInstance.get("/reports/find/" + id, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setReports(res.data);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchReports();
  }, [id, user?._id]);

  //ADD COMMENTS
  const addComment = async () => {
    const credentials = {
      postId: id,
      userId: user._id,
      body: text,
    };
    if (credentials.body === "") {
      setTimeout(() => {
        setIsImputing("Add A Comment...");
      }, 1000);
    } else {
      setIsImputing("Loading...");
      const res = await axiosInstance.put(
        `/reports/${id}/comments`,
        credentials,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      setIsImputing("comment successful");
      if (user.admin) {
        history?.push("/members");
      } else {
        history?.push("/unitmembers");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Toggle />
      <div className="card mt-4 mb-4 mx-2">
        <h2>Reports</h2>
        <hr />
        {reports.name === "Daily Report" ? (
          <table class="table">
            <thead>
              <tr>
                <th scope="col">S/N / Date</th>
                <th scope="col">Daily Tasks</th>
                <th scope="col">Achiements</th>
                <th scope="col">
                  Challenges/Suggestions (<i style={{ color: "red" }}>If Any</i>
                  )
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-danger firstrow">{reports.createdAt}</td>
                <td className="bg-success text-white firstrow">
                  {reports.executivesummary}
                </td>
                <td className="firstrow">{reports.achievements}</td>
                <td className="firstrow">{reports.Conclusion}</td>
              </tr>
            </tbody>

            <br />
          </table>
        ) : (
          <div id="Toggle-1" className="collapse show multi-collapse mx-2">
            <h6>Executive Summary</h6>
            <p className="card-body widget-content">
              {reports.executivesummary}
            </p>

            <h6>Goals Vs Achievments</h6>
            <p className="card-body widget-content">
              {reports.achievements}
              {reports.testimonies}
              {reports.financialincrease}
              {reports.projections}
              {/* <a href={reports.pictures}>Link to pictures</a> */}
            </p>
            <h6>Conclusion</h6>
            <p className="card-body widget-content">{reports.Conclusion}</p>
          </div>
        )}
      </div>

      <div className="mb-3 mx-2">
        {/* PORTAL EDITS-------------------- */}
        <label htmlFor="personalscore" className="form-label">
          {reports.name === "Daily Report"
            ? "Departmental Head Remarks"
            : `HOD's Comment`}
        </label>
        <br />
        <br />
        <br />
        {reports.comments?.map((comment) => (
          <div
            className="text-danger mx-3"
            id="challenges"
            rows="3"
            name="comments"
            key={comment._id}
          >
            <i>{comment.body}</i>
          </div>
        ))}

        {user.isAdmin === true || user.adminrights === 1 ? (
          <div>
            <label htmlFor="personalscore" className="form-label">
              Comments
            </label>
            <textarea
              className="form-control"
              id="challenges"
              rows="3"
              name="comments"
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            {imputing}
            <button className="btn btn-primary mt-2" onClick={addComment}>
              Comment
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SingleReportsPage;
