/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { formatDistanceToNowStrict } from "date-fns"
import { assets } from "../assets/assets"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { fetchProfile } from "../store/Reducers/ChannelSlice"
import { selectUser } from "../store/Reducers/UserSlice"
import { useNavigate } from "react-router-dom"
import { apiUrl } from "../utils/constants"

function HVideoCard({video,large=false}) {
  const urlPath = `${apiUrl}/videos/views/${video._id}`
  const [handlePlay,handlePause,handleVideoClick,isPlaying,videoRef,progress,duration,currentTime] = HandleHVideoCard(urlPath,video)
  const dispatch = useDispatch()
  const {userId} = useSelector(selectUser)
  const params = { username: video.owner?.username, userId }
  useEffect(()=>{
      if(window.location.href== `http://localhost:5173/profile/${params.username}`){
        dispatch(fetchProfile(params))
      }
    },[])
  return (
    <>  
        <div 
         onClick={handleVideoClick}
         onMouseEnter={handlePlay}
         onMouseLeave={handlePause}
         className="cursor-pointer w-full h-[8rem] rounded-xl text-sm flex items-center gap-3 shadow-[0_0_8px_rgba(0,0,0,0.5)]">
            <div className={`${large ?`w-[40%]`:`w-[50%]`} h-full rounded-md relative overflow-hidden shadow-[0_0_8px_rgba(0,0,0,0.5)]`}>
              {video.thumbnail &&             
                <img  className={`${isPlaying ? "hidden" : ""} ${
                  video.thumbnail ? "" : "hidden"
                } w-full h-full absolute object-cover`}  src={video.thumbnail} alt="thumbnail"/>
              }
              
              <video ref={videoRef} className="w-full h-full"  loop>
                 <source src={video.videoFile} />
              </video>
              {/* Progress Bar (Only visible when playing) */}
              {isPlaying && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
                  <div
                    className="h-full bg-red-500 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
              {/* Video Duration Overlay (Bottom Right) */}
              { isPlaying &&
                  <div className="absolute w-full bottom-2 bg-opacity-50 text-white text-xs px-2 py-1 flex justify-between">
                      <p> {currentTime} </p>
                      <p> {duration}</p>
                  </div>
              }
            </div>
            <div className={`h-full ${large ? `w-[57%]` : `w-[47%] `} pb-1 px-1 py-2 flex flex-col justify-between`}>
                <div className="h-fit w-full flex justify-between">
                  <div className=" flex w-[90%] flex-col gap-1">
                      <div className="self-start w-full text-[1rem] h-4/7 overflow-hidden text-ellipsis">{video.title}</div>
                      <h4 className="text-sm text-[#a1a1a1]">{video.owner?.fullName}</h4>
                  </div>
                  <div className="w-[10%]">
                        <assets.BiDotsVerticalRounded className="text-xl"/>
                  </div>
                </div>
                <div className="w-full flex gap-2 text-sm">
                      <p className="">{video.views}K views</p>
                      <p> . {formatDistanceToNowStrict(new Date(video.createdAt), { addSuffix: true })}</p>
                </div>
            </div>
        </div>   
    </>
  )     
}

export default HVideoCard

const HandleHVideoCard = (urlPath,video)=>{  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const videoRef = useRef(null);
  const navigate = useNavigate()
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  const updateViews = async ()=>{
    const response = await fetch(urlPath,{
       method: 'PATCH',
       credentials: 'include',
       headers: {
         'Content-Type': 'application/json',
       },
     })
     if(response.status==200){
       console.log("Views updated successfully")
     }
   }
  const handlePlay = () => {    
    if(window.location.href == `http://localhost:5173/home`){
        updateViews()   
    }
    setIsPlaying(true);
    videoRef.current.play();
  };

  const handlePause = () => {
    setIsPlaying(false);
    videoRef.current.pause();
  };

  const {isTokenValid} = useSelector(selectUser)
  const handleVideoClick = () => {
    navigate(`/watch/${video._id}`);
    if(isTokenValid){
      updateViews()
    }
  };
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const updateProgress = () => {
      const progressValue =
        (videoElement.currentTime / videoElement.duration) * 100;
      setProgress(progressValue);
      setCurrentTime(formatTime(videoElement.currentTime));
    };

    const setVideoDuration = () => {
      setDuration(formatTime(videoElement.duration));
    };

    videoElement.addEventListener("timeupdate", updateProgress);
    videoElement.addEventListener("loadedmetadata", setVideoDuration);

    return () => {
      videoElement.removeEventListener("timeupdate", updateProgress);
      videoElement.removeEventListener("loadedmetadata", setVideoDuration);
    };
  }, []);
  return [handlePlay,handlePause,handleVideoClick,isPlaying,videoRef,progress,duration,currentTime]
}