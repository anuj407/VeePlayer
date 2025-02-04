/* eslint-disable react/prop-types */
import { useRef, useState } from "react"
import { assets } from "../assets/assets"
function VideoCard({video}) {

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const handlePlay = () => {
      setIsPlaying(true)
      videoRef.current.play()
    }
    const handlePause = () => {
      setIsPlaying(false)
      videoRef.current.pause()
    }
     
  return (
    <>
        <div onMouseEnter={()=>handlePlay()} onMouseLeave={() => handlePause()}  className="w-[20.5rem] cursor-pointer flex flex-col gap-2 items-center rounded-xl overflow-hidden">
            <div className="w-full h-[12rem] rounded-xl relative overflow-hidden z-10">
                <img className={`${isPlaying ? `hidden`:``} ${video.thumbnail ? `` : `hidden`}  w-full h-full absolute object-cover`} src={video.thumbnail} alt="" />
                <video  ref={videoRef} className="w-full h-full" muted loop >
                        <source src={video.videoFile} />
                </video>
            </div>
            <div className="w-full self-start ">
                <div className="flex gap-2">
                    {/* <img src={vid} alt="" /> */}
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img className="w-full h-full object-cover" src={video.owner.avatar} alt="" />
                    </div>
                    {/* <assets.IoPersonCircleOutline className="text-4xl w-[14%]"/> */}
                    <div className="w-[78%]">
                        <p className="">{video.title} </p>
                        <div className=" text-sm text-[#cbcbcb]">
                            <h3>{video.owner.fullName}</h3>
                            <p>{video.views} views</p>
                        </div>
                    </div>
                    <assets.BiDotsVerticalRounded className="w-[8%] text-3xl"/>
                </div>                
            </div>
        </div>
    </>
  )
}

export default VideoCard