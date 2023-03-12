
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../context/authContext/AuthContext';
import ScoreCardGroupItem from './ScoreCardGroupItem';

const ScoreCardGroupList = ({ challengeuser, list}) => {
    // const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(AuthContext);
      
    return (
        <div className='ischallenge'>
          

              <div className="weekly-challenge-list">
                 {/* {isLoading ? (
                    <div className="featured"> <Skeleton type="custom"/> </div> ) :
                    (   */}
                <div className="challengeWrapper"> 
           
                {list.content.map((item, i) => (
                    <div key={i}>
                        <ScoreCardGroupItem index={i} item={item} user={challengeuser}/>
                    </div>
                   
                 )) }

                 </div>
              {/* )} */}
          </div>
        </div>
    )
}

export default ScoreCardGroupList


// <LazyLoad 
// key={p._id} 
// height={100}
// offset={[-100, 100]}
// placeholder={<Loading classaname="lazyloading"
// />}>
// </LazyLoad>