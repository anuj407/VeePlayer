import { useDispatch, useSelector } from "react-redux"
import Category from "./category"
import { fetchVideos, selectVideos } from "../store/Reducers/VideoSlice"
import { useEffect } from "react"
import HVideoCard from "./HVideoCard"

function SuggestVideo() {
  const dispatch = useDispatch()
  const {videos,status} = useSelector(selectVideos)
  useEffect(()=>{
       if(status === 'idle'){
          dispatch(fetchVideos())
       }
  },[dispatch, status])
  return (
    <>
      <div className="w-[25%] h-full flex flex-col gap-6">
        <div className="flex ">
           <Category/>
        </div>
        <div className="flex flex-col gap-3">
          {videos.map((video,index)=><HVideoCard key={index} video={video} />)}
        </div>
      </div>
    </>
  )
}

export default SuggestVideo