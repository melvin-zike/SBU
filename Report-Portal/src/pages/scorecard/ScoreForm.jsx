import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Edit, Markunread, Save, Send } from "@material-ui/icons";

const ScoreForm = ({ reps }) => {
  const [achieved, setAchieved] = useState();
  const [imputing, setIsImputing] = useState("");

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const sendScore = async (id) => {
    try {
      const body = {
        achieved: achieved,
        targetId: id,
      };
      setIsImputing("Loading...");
      const userId = reps.userId;
      await axiosInstance.put(`/targets/${userId}/achieve`, body, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setIsImputing("score updated...");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form>
      <input
        type="text"
        className="score-input"
        placeholder="0"
        onChange={(e) => setAchieved(e.target.value)}
      />
      <Save
        onClick={(e) => {
          sendScore(reps._id);
        }}
      />
      {imputing}
    </form>
  );
};

export default ScoreForm;
