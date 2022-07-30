import { useContext, useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { MusicNote,  Add, Remove,  ThumbUp, BugReportTwoTone, Visibility, } from "@material-ui/icons";
import axios from "axios";
import { AuthContext } from '../../context/authContext/AuthContext';

const ScoreCardItem = ({item, user}) => {
    const [playing, setPlaying] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const videoRef2 = useRef(null);
    const { user: currentUser } = useContext(AuthContext);
    const [challenges, setChallenges] = useState([]);
    const [credits, setCredits] = useState(5);
    const [amount, setAmount] = useState(10);
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });

    //  check votes 
  useEffect(() => {
    setCredits(challenges?.credit);
  }, [challenges?.credit]);

    //get movies
    useEffect(() => {
      const getChallenges = async () => {
        try{
          const res = await axiosInstance.get('http://localhost:4000/api/movies/find/' + item, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
            },
          });
          // console.log(res)
          setChallenges(res.data)
        }catch(err){
          console.log(err);
        }
      };
      getChallenges();
    }, [item])
    console.log(challenges);


    //Votes Handler------------------------------------
  const handleClick = async (type) => {
    const credent = {
      postId: challenges?._id,
      userId: currentUser?._id,
      amount: amount,
    }
      const id = challenges?.userId;
    try {
        const res = await axiosInstance.put(`/movies/${id}/credit`, credent, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
          },
        });
          
    } catch (err) {
      console.log(err);
    }
  };

  





    const onVideoPress = (e) => {
      e.preventDefault()
      if(playing){
        videoRef2.current.pause();
        setPlaying(false);
      }else{
        videoRef2.current.play();
        setPlaying(true);
      }
        }

        const AddAmount = () => {
          setAmount(amount + 1);
        }
        const RemoveAmount = () => {
          if(amount == 1){
            setAmount(1);
          }else{
            setAmount(amount - 1);
          }
          
        }

  return (
      <>
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>{challenges?.username}</td>
      
    </tr>
  </tbody>
</table>
       {
              challenges?.isChallenge==true ? (
     <div className="challenge-post">
             {/* <div className="challenge-post-container">
               <video src={challenges?.video} 
               className="weekly-challenge-video"
            
               controls
               onClick={()=>onVideoPress}
               ref={videoRef2}
               />
             </div> */}
            <div className="challenge-info-container">
             
               <MusicNote className='music-note-challenge' />
                 
                 <div className="challengeInfo">
                     
                     <div className="amount-votes">
                     
                     
                     

                     {/* Tables----------------------------------- */}


                     </div>
                     
                 </div>
            </div>
             
      </div>
               ):(
                ""
            )
        }
      
      
      </>
      
  )
};

export default ScoreCardItem;
