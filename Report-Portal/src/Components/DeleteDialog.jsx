import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { getMovies, deleteMovie } from "../context/movieContext/apiCalls";
import { MovieContext } from "../context/movieContext/MovieContext";

const DeleteDialog = ({ del }) => {
  const { movies, dispatch } = useContext(MovieContext);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  //   const handleDelete = async (id) => {
  //     try {
  //       const res = await axiosInstance.delete(`/calender/${id}`, {
  //         headers: {
  //           token:
  //             "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
  //         },
  //       });
  //       if (res.status == 200) {
  //         console.log(res.data);
  //         window.location.reload();
  //       }
  //     } catch (err) {
  //       console.log(err);

  //     }
  //   };

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
    console.log(id);
  };

  return (
    // {/* <!-- Modal --> */}
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 text-danger">
              <h4>Sure you want to delete this?</h4>
            </div>
            <br />
            <br />
            {/* ..................................................  */}
            ...
          </div>
          <div class="modal-footer text-center">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() => handleDelete(del._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
