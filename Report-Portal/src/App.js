import React, { Suspense, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context/authContext/AuthContext";
import "./app.scss";
// import Application from "./components/Application";

import SuspenseFallback from "./pages/suspense/SuspenseFallback";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import PagenotFound from "./pages/pagenotfound/PagenotFound";

import CreateReport from "./pages/createreport/CreateReport";
import ScoreCard from "./pages/scorecard/ScoreCard";
import Testimony from "./pages/testimony/Testimony";
import Appraisals from "./pages/appraisals/Appraisals";
import Announcements from "./pages/announcements/Announcements";
import NewUser from "./pages/newuser/NewUser";
import Members from "./pages/members/Members";
import ReportsPage from "./pages/reportspage/ReportsPage";
import SingleReportsPage from "./pages/singlereportspage/SingleReportsPage";
import MemberScoreCard from "./pages/memberscorecard/MemberScoreCard";
import UnitMembers from "./pages/unitmembers/UnitMembers";
import UnitScoreCard from "./pages/unitscorecard/UnitScoreCard";
import ScoreCardGroup from "./pages/scorecardgroup/ScoreCardGroup";
import ViewCalender from "./pages/viewcalender/ViewCalender";
import ViewReportCalender from "./pages/viewreportcalender/ViewReportCalender";
import DailyReport from "./pages/dailyreport/DailyReport";
import ViewDailyReportCalender from "./pages/viewdailyreportcalender/ViewDailyReportCalender";

//components

function App() {
  const { user } = useContext(AuthContext);
  // const history = useHistory();
  // let currentDate = new Date().getTime();
  return (
    <>
      <Router>
        <Suspense fallback={<SuspenseFallback />}>
          <div className="appbackground">
            {/* <Topbar /> */}
            <Switch>
              <Route path="/login">
                {user ? <Redirect to="/" /> : <Login />}
              </Route>

              <Route exact path="/">
                {!user ? <Redirect to="/login" /> : <Home type="challenge" />}
              </Route>

              <Route path="/create-report/:fullname">
                {!user ? <Redirect to="/login" /> : <CreateReport />}
              </Route>

              <Route path="/daily-report/:fullname">
                {!user ? <Redirect to="/login" /> : <DailyReport />}
              </Route>

              <Route path="/newuser">
                {!user ? <Redirect to="/login" /> : <NewUser />}
              </Route>

              <Route path="/testimony">
                {!user ? <Redirect to="/login" /> : <Testimony />}
              </Route>
              <Route path="/appraisals">
                {!user ? <Redirect to="/login" /> : <Appraisals />}
              </Route>
              <Route path="/announcements">
                {!user ? <Redirect to="/login" /> : <Announcements />}
              </Route>

              <Route exact path="/reports/:fullname">
                {!user ? <Redirect to="/login" /> : <ReportsPage />}
              </Route>

              <Route exact path="/single/:id">
                {!user ? <Redirect to="/login" /> : <SingleReportsPage />}
              </Route>
              <Route exact path="/viewcalender/:id">
                {!user ? <Redirect to="/login" /> : <ViewCalender />}
              </Route>
              <Route exact path="/viewreportcalender/:id">
                {!user ? <Redirect to="/login" /> : <ViewReportCalender />}
              </Route>

              <Route exact path="/viewdailyreportcalender/:id">
                {!user ? <Redirect to="/login" /> : <ViewDailyReportCalender />}
              </Route>
              <Route exact path="/members-scorecard/:fullname">
                {!user ? <Redirect to="/login" /> : <MemberScoreCard />}
              </Route>

              <Route path="/profile">
                {!user ? <Redirect to="/login" /> : <Profile />}
              </Route>

              <Route path="/members">
                {!user ? <Redirect to="/login" /> : <Members />}
              </Route>
              <Route path="/unitmembers">
                {!user ? <Redirect to="/login" /> : <UnitMembers />}
              </Route>
              <Route path="/unitscorecard">
                {!user ? <Redirect to="/login" /> : <UnitScoreCard />}
              </Route>

              <Route path="/score-card">
                {!user ? <Redirect to="/login" /> : <ScoreCard />}
              </Route>

              <Route path="/scorecardgroup">
                {!user ? <Redirect to="/login" /> : <ScoreCardGroup />}
              </Route>

              <Route component={PagenotFound} />
            </Switch>
          </div>
        </Suspense>
      </Router>
    </>
  );
}
export default App;
