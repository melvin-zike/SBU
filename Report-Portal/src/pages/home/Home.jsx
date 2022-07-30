import React from 'react'
import { Link } from "react-router-dom";
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
import Navbar from "../../Components/navbar/Navbar"
import Sidebar from "../../Components/sidebar/Sidebar"
import Banner from "../../Components/banner/Banner"
import Toggle from "../toggle/Toggle";
import "./home.scss";

const Home = ({type}) => {
  // const { dispatch } = useContext(MovieContext);

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setMovie({...movie, [e.target.name]: value});
  // };

  // const handleSubmit =(e)=>{
  //   e.preventDefault();
  //    createMovie(movie, dispatch); 
  // }


  return (
  <div className="Frontpage">
  <Navbar />
   <Toggle />
    <div className="play-banner">  
    <Sidebar id="sidemenu"/>
    <Banner type={type}/>
    </div>
  </div>
  )
}

export default Home