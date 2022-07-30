import React, { Suspense, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from './context/authContext/AuthContext';
import "./app.scss";
// import Application from "./components/Application";

import SuspenseFallback from "./pages/suspense/SuspenseFallback";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import PagenotFound from "./pages/pagenotfound/PagenotFound";

import Product from "./pages/product/Product";
import ProductList from "./pages/productList/ProductList";
import ListList from "./pages/listList/ListList"
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";


import NewProduct from "./pages/newProduct/NewProduct";
import Ads from "./pages/ads/Ads";
import AdList from "./pages/adsList/AdsList";
import CreateReport from './pages/createreport/CreateReport';
import ScoreCard from './pages/scorecard/ScoreCard';
import Testimony from './pages/testimony/Testimony';
import Appraisals from './pages/appraisals/Appraisals';
import Announcements from './pages/announcements/Announcements';
import NewUser from './pages/newuser/NewUser';
import Members from './pages/members/Members';
import ReportsPage from './pages/reportspage/ReportsPage';
import SingleReportsPage from './pages/singlereportspage/SingleReportsPage';

//components


function App () { 
  const { user } = useContext(AuthContext);
  // const history = useHistory();
  // let currentDate = new Date().getTime();
  return (
    <>
      <Router>  
         
  <Suspense fallback ={<SuspenseFallback />}> 
        <div className="appbackground">
         {/* <Topbar /> */}
         <Switch>
             <Route path="/login">
             {user ? <Redirect to="/" /> : <Login />}  
             </Route>

             <Route exact path="/">
             {!user ? <Redirect to="/login" /> : <Home type="challenge"/>} 
             </Route>

             <Route path="/create-report">
             {!user ? <Redirect to="/login" /> : <CreateReport />} 
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

             <Route exact path="/single/report/:id">
         {!user ? <Redirect to="/login" /> : <SingleReportsPage />}
         </Route>

             <Route path="/profile">
             {!user ? <Redirect to="/login" /> : <Profile />} 
             </Route>

             <Route path="/members">
             {!user ? <Redirect to="/login" /> : <Members />} 
             </Route>

             <Route path="/score-card">
             {!user ? <Redirect to="/login" /> : <ScoreCard />} 
             </Route>

             <Route path="/movies">
            <ProductList />
          </Route>

          <Route path="/product/:productId">
            <Product />
          </Route>

          <Route path="/newproduct">
            <NewProduct />
          </Route>

          <Route path="/ads">
            <Ads />
          </Route>
          <Route path="/adlist">
            <AdList />
          </Route>
          <Route path="/lists">
            <ListList />
              </Route>
          <Route path="/list/:listId">
                <List />
          </Route>
          <Route path="/newlist">
              <NewList />
            </Route>
     
         <Route component={PagenotFound} />
         
     
        </Switch>
         </div>
       
  </Suspense>
    </Router>
    </>
  )
}
export default App;
