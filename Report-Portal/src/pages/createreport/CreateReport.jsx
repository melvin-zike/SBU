import { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/navbar/Navbar";
import Sidebar from "../../Components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import "./createreport.scss";
import storage from "../../firebase";
import { deleteTransaction } from "../../context/transactionContext/apiCalls";
import { TransactionContext } from "../../context/transactionContext/TransactionContext";
import Toggle from "../toggle/Toggle";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";
import CreateReportModal from "../../Components/createreportmodal/CreateReportModal";
import CreateReportCalenderModal from "../../Components/createreportcalendermodal/CreateReportCalenderModal";
import ReportCalender from "../../Components/reportcalender/ReportCalender";

const CreateReport = () => {
  const { transactions, dispatch } = useContext(TransactionContext);
  const [list, setList] = useState(null);
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState([]);
  const [edits, setEdits] = useState({});

  console.log(edit);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const fullname = user?.fullname;
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

  //Edit form populated

  useEffect(() => {
    const fetchEdits = async () => {
      try {
        const res = await axiosInstance.get(`/reports/find/${edit}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setEdits(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEdits();
  }, [edit]);

  return (
    <div>
      <Navbar />
      <Toggle />
      <div className="main">
        <Sidebar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-lg-2 col-xlg-3 my-2">
              <div
                className="card card-hover"
                data-bs-toggle="modal"
                data-bs-target="#reportcalenderModal"
              >
                <div className="box bg-warning text-center">
                  <h1 className="font-light text-white">
                    <i className="mdi mdi-pencil"></i>
                  </h1>
                  <h6 className="text-white">Create Reports Dates</h6>

                  {/* MODAL---------------- */}
                </div>
              </div>
            </div>

            <CreateReportCalenderModal />
            <div className="col-md-6 col-lg-2 col-xlg-3 my-2">
              <div
                className="card card-hover"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <div className="box bg-cyan text-center">
                  <h1 className="font-light text-white">
                    <i className="mdi mdi-pencil"></i>
                  </h1>
                  <h6 className="text-white">Create Reports</h6>

                  {/* MODAL---------------- */}
                </div>
              </div>
            </div>

            <CreateReportModal />
          </div>

          <ReportCalender />
        </div>
      </div>
    </div>
  );
};

export default CreateReport;
