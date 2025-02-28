import { useSelector } from "react-redux"
import { selectVideos } from "../store/Reducers/VideoSlice.jsx"
import VideoCard from "./VideoCard.jsx"
function Channel_HomeVideo() {
  const {videos}= useSelector(selectVideos)
  return (
    <>
       <div className="">
        <h1 className="text-xl font-semibold" >Videos</h1>
        <div className="flex mt-2">
           {videos.map((video,index)=><VideoCard key={index} video={video}/>)}
        </div>
       </div>
    </>
  )
}

export default Channel_HomeVideo;