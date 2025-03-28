import { useSelector } from "react-redux"
import VideoCard from "./VideoCard.jsx"
function Channel_HomeVideo() {
  const userVideos = useSelector((state) => state.userVideos.videos);
  return (
    <>
       <div className="">
        <h1 className="text-xl font-semibold" >Videos</h1>
        <div className="flex flex-wrap gap-3 gap-y-5 mt-2">
           {userVideos.map((video,index)=>
           <div key={index} className="w-[19%] h-[14rem]">
             <VideoCard video={video}/>
           </div>
           )}
        </div>
       </div>
    </>
  )
}

export default Channel_HomeVideo;