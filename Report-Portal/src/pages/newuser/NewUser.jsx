import { useRef, useState } from "react";
import Navbar from '../../Components/navbar/Navbar';
import Toggle from '../toggle/Toggle';
import './newuser.scss';
import axios from "axios";
import { useHistory } from "react-router";
import {Link} from "react-router-dom";

const NewUser = () => {
  const [msg, setMsg ] = useState("");
  const [erro, setErro ] = useState("");
  const [focused, setHandleFocused] = useState(false);
  const [focused1, setHandleFocused1] = useState(false);
  const [focused2, setHandleFocused2] = useState(false);
  const [focused3, setHandleFocused3] = useState(false);
  const [focused5, setHandleFocused5] = useState(false);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });
  const fullname = useRef();
  const email = useRef();
  const unit = useRef();
  const password = useRef();
  const phone = useRef();
  const location = useRef();
  const adminrights = useRef();
  const isAdmin = useRef();
  

  const handleFocus = (e) => {
    e.preventDefault()
    setHandleFocused(true);
  }
  const handleFocus1 = (e) => {
    e.preventDefault()
    setHandleFocused1(true);
  }
  const handleFocus2 = (e) => {
    e.preventDefault()
    setHandleFocused2(true);
  }
  const handleFocus5 = (e) => {
    e.preventDefault()
      setHandleFocused5(true);
    
  }
  

  const handleClick = async (e) => {
    e.preventDefault();
      const body = {
        fullname: fullname.current.value,
        unit: unit.current.value,
        email: email.current.value,
        phone: phone.current.value,
        password: password.current.value,
        location: location.current.value,
        isAdmin: isAdmin.current.value,
        adminrights: adminrights.current.value,
        
      };
      try {
        const res = await axiosInstance.post("/auth/register", body);
        console.log(body);
        if(res.status == 200){
          console.log(res.data);
          setMsg(res.data.message);
          window.location.reload()
          // history.push("/login");
        }
       
      } catch (err) {
        if(err.response?.status == 400)
        setErro("username or email already exists");
        setTimeout(() => {
          setErro("");
        }, 3000);
      
    }
  };




  return (
    <section>
      {/* <Navbar />
      <Toggle /> */}
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-8 col-xl-6">
          <div class="row">
            <div class="col text-center title">
              <h1 className='newuserheader'>Create A New Member</h1>
            </div>
            <p className="success">{msg}</p>
          <p className="dangerous">{erro}</p>
          </div>
          <div class="row align-items-center">
            <div class="col mt-4">
              <input 
              type="text" 
              class="form-control" 
              ref={fullname}
              placeholder="Full Name" />
            </div>
          </div>
          <select class="form-select" name='department' ref={unit} aria-label="Default select example">
                  <option selected>Unit</option>
                   <option value="1">Production/logistics</option>
                  <option value="2">External Partners</option>
                  <option value="3">Angel Market Place</option>
                  <option value="4">Angel Global Call Center</option>
                  <option value="4">RBIM & LWPM</option>
                  <option value="4">ROR SBU RLM Team B Unit 4</option>
                  <option value="4">ROR SBU RLM Team B Unit 5</option>
                  <option value="4">Lagos UK/Office</option>
                  <option value="4">Performance Management</option>
                  <option value="4">HR</option>
                  </select>
          <div class="row align-items-center mt-4">
            <div class="col">
              <input type="email" class="form-control" ref={email} placeholder="Email" />
            </div>
          </div>
          <div class="row align-items-center mt-4">
            <div class="col">
              <input type="location" class="form-control" ref={location} placeholder="Location" />
            </div>
          </div>
          <div class="row align-items-center mt-4">
            <div class="col">
              <input type="number" ref={phone} class="form-control" placeholder="Phone" />
            </div>
          </div>

          <select class="form-select" name='isAdmin' ref={isAdmin}  aria-label="Default select example">
                  <option selected>Is Admin</option>
                   <option value="true">Yes</option>
                  <option value="false">No</option>
                  </select>
         <div class="row align-items-center mt-4">
            
          </div>          
                 
                  <select class="form-select" name='adminrights' ref={adminrights}  aria-label="Default select example">
                  <option selected>Admin Or Member Role</option>
                   <option value="1">Collating Officer (UNIT HEAD)</option>
                  <option value="2">Performance Manager</option>
                  <option value="3">HOD</option>
                  <option value="4">HOP</option>
                  <option value="5">Member</option>
                  
                  </select>
          
          <div class="row align-items-center mt-4">
            <div class="col">
              <input type="password" class="form-control" ref={password} placeholder="Password" />
            </div>
          </div>
          <div class="row justify-content-start mt-4">
            <div class="col">

              <button class="btn btn-primary mt-4" onClick={handleClick}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default NewUser