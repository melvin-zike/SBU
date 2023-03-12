import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./toggle.scss";
import {
  PlayCircleFilledOutlined,
  Group,
  ArrowDropDown,
  CardGiftcard,
  CampaignIcon,
  House,
  Cloud,
  Add,
  Announcement,
} from "@material-ui/icons";

const Toggle = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <a
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
      >
        <ArrowDropDown class="bg-white tog-arrow" />
      </a>
      <div
        class="offcanvas offcanvas-start canva-color"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">
            Hi {user.fullname}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div>
            {user.isAdmin
              ? "You Are An Admin"
              : !user.isAdmin
              ? "You Are Now A Member"
              : ""}
          </div>

          {/* HOME SIDE BAR------------------------------------- */}

          <ul className="sidebar2">
            <li className="sidebarList2">
              <Link to="/" className="listLink">
                <House className="sidebarIcon2" />

                <span className="sidelinktext2">
                  <h5>Home</h5>
                </span>
              </Link>
            </li>
            <li className="sidebarList2">
              {/* {user?.isFan === true ? "" : */}
              <Link to="/create-report" className="listLink">
                <Add className="sidebarIcon2" />

                <span className="sidelinktext2 others">
                  <h5>Create Report</h5>
                </span>
              </Link>
              {/* }      */}
            </li>
            <li className="sidebarList2">
              <Link to="/score-card" className="listLink">
                <PlayCircleFilledOutlined className="sidebarIcon2" />

                <span className="sidelinktext2 ">
                  <h5>Scorecard</h5>
                </span>
              </Link>
            </li>
            <li className="sidebarList2">
              <Link to="/appraisals" className="listLink">
                <CardGiftcard className="sidebarIcon2" />

                <span className="sidelinktext2">
                  <h5>Appraisals</h5>
                </span>
              </Link>
            </li>
            <li className="sidebarList2">
              <Link to="/announcements" className="listLink">
                <Group className="sidebarIcon2" />

                <span className="sidelinktext2">
                  <h5>Announcements</h5>
                </span>
              </Link>
            </li>
            <li className="sidebarList2">
              <Link to="/testimony" className="listLink">
                <Cloud className="sidebarIcon2" />

                <span className="sidelinktext2">
                  <h5>Testimony</h5>
                </span>
              </Link>
            </li>
            <li className="sidebarListItem">
              {user.adminrights === 3 || user.adminrights === 4 ? (
                <Link to="/unitmembers">
                  <h4 className="sidebarTitle">Unit Members</h4>
                </Link>
              ) : (
                ""
              )}
            </li>
          </ul>
          <br />
          <hr />
          <br />

          {user.isAdmin == true ? (
            <div>
              <h4 className="sidebarTitle">All Members</h4>
              <ul className="sidebarFriendList">
                {/* {newUsers.map((u) => (
    <div key={u._id}>
       <Online user={u} />
    </div>
   
  ))} */}
              </ul>

              <hr />

              <Link to="/newuser">
                <h4 className="sidebarTitle">Create Users</h4>
              </Link>
              <Link to="/members">
                <h4 className="sidebarTitle">Members</h4>
              </Link>

              <h4 className="sidebarTitle">Reports</h4>
              <h4 className="sidebarTitle">Notifications</h4>
              <div className="challengeLeft">
                <Link to="/challenge-page">
                  <Announcement />
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Toggle;
