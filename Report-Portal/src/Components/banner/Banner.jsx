import { useEffect, useState, useContext } from "react";
import "./banner.scss";
import axios from "axios";
import Slider from "./Slider";
import MyTargets from "../myTargets/MyTargets";
import MyCalender from "../mycalender/MyCalender";

import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import { getMovies, deleteMovie } from "../../context/movieContext/apiCalls";
import CreateTargetModal from "../createtargetmodal/CreateTargetModal";
import CreateDatesModal from "../createcalendermodal/CreateCalenderModal";
import GoalModal from "../goalmodal/GoalModal";
import Awards from "../awards/Awards";
import Todo from "../todo/Todo";
import Notice from "../notice/Notice";
import Chats from "../chats/Chats";
import Testimonies from "../testimonies/Testimonies";
import Word from "../word/Word";
import CreateGoalsModal from "../creategoalsmodal/CreateGoalsModal";

const Banner = ({ type }) => {
  const [targets, setTargets] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(MovieContext);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  return (
    <div class="page-wrapper">
      {/* <!-- ============================================================== -->
       
        <!-- Container fluid  -->
        <!-- ============================================================== --> */}
      <div class="container-fluid">
        {/* <!-- ============================================================== -->
          <!-- Sales Cards  -->
          <!-- ============================================================== --> */}
        <div class="row">
          {/* <!-- Button trigger modal --> */}

          {/* <!-- Column --> */}
          <div class="col-md-6 col-lg-2 col-xlg-3 ">
            <div
              class="card card-hover"
              data-bs-toggle="modal"
              data-bs-target="#datesModal"
            >
              <div class="box bg-warning text-center">
                <h1 class="font-light text-white">
                  <i class="mdi mdi-pencil"></i>
                </h1>
                <h6 class="text-white">Create Dates</h6>
              </div>
            </div>
          </div>

          <CreateDatesModal />
          {/* <!-- Column --> */}
          <div class="col-md-6 col-lg-2 col-xlg-3 ">
            <div
              class="card card-hover"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <div class="box bg-cyan text-center">
                <h1 class="font-light text-white">
                  <i class="mdi mdi-pencil"></i>
                </h1>
                <h6 class="text-white">Create Targets</h6>
              </div>
            </div>
          </div>

          <CreateTargetModal />

          {/* <!-- Column --> */}
          {user.isAdmin === true ? (
            <div
              class="col-md-6 col-lg-2 col-xlg-3"
              data-bs-toggle="modal"
              data-bs-target="#goalsModal"
            >
              <div class="card card-hover">
                <div class="box bg-warning text-center">
                  <h1 class="font-light text-white">
                    <i class="mdi mdi-calendar-check"></i>
                  </h1>
                  <h6 class="text-white">Set Goals</h6>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <CreateGoalsModal />
        </div>

        {/* <!-- Recent comment and chats --> */}

        <div class="row">
          <Awards />
          {/* <!-- column --> */}
          <div class="col-lg-6">
            <MyCalender />
            {/* <!-- Card --> */}
            <Todo />
            {/* <!-- card --> */}

            {/* <!-- card new --> */}
            {/* <Chats /> */}

            {/* Myreports go here */}

            {/* <Testimonies /> */}
          </div>
          {/* <!-- column --> */}

          <div class="col-lg-6">
            {/* <!-- Card --> */}
            <MyTargets />
            {/* <!-- card --> */}
            {/* <Word /> */}
            <Word />
            {/* <!-- toggle part --> */}
            <div id="accordian-4">{/* <Word /> */}</div>
            {/* <!-- Tabs --> */}
          </div>
        </div>
        {/* <!-- ============================================================== -->
          <!-- Recent comment and chats -->
          <!-- ============================================================== --> */}
      </div>
      {/* <!-- ============================================================== -->
        <!-- End Container fluid  -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- footer -->
        <!-- ============================================================== --> */}
      <footer class="footer text-center">
        All Rights Reserved by LoveWorld Publishing admin.
      </footer>
      {/* <!-- ============================================================== -->
        <!-- End footer -->
        <!-- ============================================================== --> */}
      {/* </div>
      <!-- ============================================================== -->
      <!-- End Page wrapper  -->
      <!-- ============================================================== --> */}
    </div>
  );
};

export default Banner;
