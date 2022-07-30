import React from 'react'
import Navbar from '../../Components/navbar/Navbar'
import Sidebar from '../../Components/sidebar/Sidebar'
import { useContext, useEffect, useState } from "react";
import "./announcement.scss";
import storage from "../../firebase";
import { createMovie, getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import { createList } from "../../context/listContext/apiCalls";
import Toggle from "../toggle/Toggle"
import { useHistory } from "react-router-dom";

const Announcements = () => {
    const [list, setList] = useState(null);
  const history = useHistory()

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);


  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  console.log(list);
  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    history.push("/lists")
  };


  return (
    <div>
        <Navbar />
        <Toggle />
        <div className="main">
        <Sidebar />
        <div className="createProduct">
         WAIT FOR ANNOUNCEMENTS
        </div>

        </div>
       
    </div>
  )
}

export default Announcements