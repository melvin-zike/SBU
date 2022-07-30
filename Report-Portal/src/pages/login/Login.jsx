import { useContext, useState, useRef } from "react";
import { login } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import "./login.scss";
// import { useHistory } from "react-router";
// import {Link} from "react-router-dom";


export default function Login() {
  const [email, setEmail ] = useState("");
    const [erromsg, setErrorMsg ] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [password, setPassword ] = useState("");
    const {isFetching, error, dispatch} = useContext(AuthContext);
    const [focused1, setHandleFocused1] = useState(false);
    const [focused2, setHandleFocused2] = useState(false);
  

  

//   const axiosInstance = axios.create({
//     baseURL: process.env.REACT_APP_API_URL
//   });
  const handleLogin = (e) => {
    e.preventDefault();
    login({email, password}, dispatch);
        
}

const handleFocus1 = (e) => {
  e.preventDefault()
  setHandleFocused1(true);
}

const handleFocus2 = (e) => {
  e.preventDefault()
  setHandleFocused2(true);
}

  return (
<div className="loginWrapper">
      {/* <h3 className="loginLogo">Feel The sound code...</h3> */}
          
      <div className="loginRight">

        <div className="logo-title">
        <img src="/assets/images/frontpage-logo.png.png" className="front-logo"/>
        <h3 className="front-header">SBU REPORTING PORTAL</h3> 
        </div>
          
        <form className="loginBox">

          {
           error == true ? 
           <p className='dangerous-login'>Wrong username or passord</p> : ""
           }
          <h2 className="msg-info">Staff Login</h2>
          
          {/* <p className="success">{msg}</p>
          <p className="dangerous">{erro}</p> */}
            
           
            <input
              type="email"
              placeholder="Email"
              required
              className="emailInput"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleFocus1}
              focused1={focused1.toString()}
            />
           
            <input
              placeholder="Password"
              required
              className="passwordInput"
              type="password"
             onChange={(e) => setPassword(e.target.value)}
              onBlur={handleFocus2}
              focused2={focused2.toString()}
            />
            

            <button 
            className="loginButton" 
            onClick={handleLogin} 
            disabled={isFetching}
            >
              Login
            </button>
           
          </form>
          
      </div>
   
      {/* FAN REGISTRATION FORM -------------------------------------------------------------------------- */}
        <div className="loginLeft">
         {/* <span className="loginDesc">
            <p>Mictok is A video Sharing Platform Where Upcoming Artist.. </p>
            <p>Show Their Musical Talents, connect with fans and Potential Sponsors around the world.</p>
          </span> */}
          
          <div class="imagesContainer">
		         <div class="imageDiv image1">
             <p class="words">Welcome To Our Productivity Portal</p>
             </div>

		         <div class="imageDiv image2 fadeInClass">
             <p class="words">Win Our Esteemed Staff Of The Month Award By Standing Out</p>
             </div>
             
		         <div class="imageDiv image3 fadeInClass2">
             <p class="words">Drop Monthly And Weekly Reports Here</p>
             </div>
             
	        </div> 
       </div>
       
</div>

  );
}