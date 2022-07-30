import "./sidebar.scss";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/authContext/AuthContext';
import axios from "axios";
import {
  PlayCircleFilledOutlined,
  Group,
  CardGiftcard,
  CampaignIcon,
  House,
  Cloud,
  Add,
  Announcement,
} from "@material-ui/icons";
import { userData } from "../../dummyData";
// import Online from "../online/Online";

// import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  const [ newUsers, setNewUsers ] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getNewUsers = async ()=> {
        try{
              const res = await axios.get("/users/all?new=true", {
                headers: {
                  token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                },
              });
              setNewUsers(res.data);
        }catch(err){
          console.log(err);
        }
    }
    getNewUsers();
  }, [])

  
  return (
    <div className="sidebar1">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
          <Link to="/" className="messengerLink">
            <House className="sidebarIcon" />
            
            <span className="sidebarListItemText">Home</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            {/* {user?.isFan === true ? "" : */}
            <Link to="/create-report" className="messengerLink">
            <Add className="sidebarIcon" />
            
            <span className="sidebarListItemText others" >Create Report</span>
            </Link>
            {/* }      */}
          </li>
          <li className="sidebarListItem">
          <Link to="/score-card" className="messengerLink">
            <PlayCircleFilledOutlined className="sidebarIcon" />
           
            <span className="sidebarListItemText others">Scorecard</span>
            </Link>
          </li>
          <li className="sidebarListItem">
          <Link to="/appraisals" className="messengerLink">
            <CardGiftcard className="sidebarIcon" />
           
            <span className="sidebarListItemText">Appraisals</span>
            </Link>
          </li>
          <li className="sidebarListItem">
          <Link to="/announcements" className="messengerLink">
            <Group className="sidebarIcon" />
            
            <span className="sidebarListItemText">Announcements</span>
            </Link>
          </li>
          <li className="sidebarListItem">
          <Link to="/testimony" className="messengerLink">
            <Group className="sidebarIcon" />
            
            <span className="sidebarListItemText">Testimony</span>
            </Link>
          </li>
          {/* <li className="sidebarListItem">
            
            <Shop className="sidebarIcon" />
            <a href="https://www.domot.ng" className="messengerLink">
            <span className="sidebarListItemText others" ><h3>MarketPlace</h3></span>
            </a>
          </li> */}
          {/* <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li> */}
          {/* <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>

          <button className="sidebarButton">Show More</button> */}
        </ul>
        
        <hr className="sidebarHr" />
       {user.isAdmin == true ? <div>

        <h4 className="sidebarTitle">All Members</h4>
        <ul className="sidebarFriendList">
          {/* {newUsers.map((u) => (
            <div key={u._id}>
               <Online user={u} />
            </div>
           
          ))} */}
        </ul>
        
        <hr />
        
        <Link to='/newuser'>
        <h4 className="sidebarTitle">Create Users</h4>
        </Link>
        <Link to='/members'>
        <h4 className="sidebarTitle">Members</h4>
        </Link>
        
        <h4 className="sidebarTitle">Reports</h4>
        <h4 className="sidebarTitle">Notifications</h4>
        <div className="challengeLeft"> 
            <Link to="/challenge-page">
            <Announcement />
           </Link>
          </div>

       </div> : ''}
       
          
      </div>
    </div>
  );
}