/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../utils/constants";

function VideoCard({ video }) {
  
  const urlPath = `${apiUrl}/videos/views/${video._id}`
  const [handlePlay,handlePause,handleVideoClick,isPlaying,videoRef,progress,duration,currentTime] = HandleVideoCard(urlPath,video)

  return (
    <div
      onClick={handleVideoClick}
      onMouseEnter={handlePlay}
      onMouseLeave={handlePause}
      className="w-[20.5rem] cursor-pointer flex flex-col gap-2 items-center rounded-xl overflow-hidden"
    >
      {/* Video Container */}
      <div className="w-full h-[12rem] rounded-xl relative overflow-hidden z-10">
        {/* Thumbnail (Hidden when playing) */}
        <img
          className={`${isPlaying ? "hidden" : ""} ${
            video.thumbnail ? "" : "hidden"
          } w-full h-full absolute object-cover`}
          src={video.thumbnail}
          alt=""
        />
        {/* Video */}
        <video ref={videoRef} className="w-full h-full" muted loop>
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

      {/* Video Details */}
      <div className="w-full self-start">
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={video.owner.avatar}
              alt=""
            />
          </div>
          <div className="w-[78%]">
            <p>{video.title} </p>
            <div className="text-sm text-[#cbcbcb]">
              <h3>{video.owner.fullName}</h3>
              <p>{video.views} views</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;

const HandleVideoCard = (urlPath,video)=>{  
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
    if(window.location.href == `http://localhost:5173/profile`){
        updateViews()   
    }
    setIsPlaying(true);
    videoRef.current.play();
  };

  const handlePause = () => {
    setIsPlaying(false);
    videoRef.current.pause();
  };
  const handleVideoClick = () => {
    navigate(`/watch/${video._id}`);
    updateViews()
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