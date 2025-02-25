/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { formatDistanceToNowStrict } from "date-fns"
import { assets } from "../assets/assets"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchProfile } from "../store/Reducers/ChannelSlice"
import { selectUser } from "../store/Reducers/UserSlice"

function HVideoCard({video}) {

  const dispatch = useDispatch()
  const {userId} = useSelector(selectUser)
  const params = { username: video.owner.username, userId }
  useEffect(()=>{
      if(window.location.href== `http://localhost:5173/channel/${params.username}`){
        dispatch(fetchProfile(params))
      }
    },[])
  return (
    <>  
        <div className="cursor-pointer w-full h-32 px-1 py-2 rounded-xl text-sm flex items-center gap-2">
            <div className="w-[50%] h-full rounded-md overflow-hidden">
              {video.thumbnail &&             
                <img className="w-full h-full object-fill" src={video.thumbnail} alt="thumbnail"/>
              }
              <video src={video.videoFile}></video>
            </div>
            <div className="h-full w-[42%] flex flex-col gap-1">
                <div className="self-start h-4/7">{video.title}</div>
                <h4 className="text-sm text-[#a1a1a1]">{video.owner?.fullName}</h4>
                <div className="flex gap-2 text-xs">
                   <p className="">{video.views} views</p>
                   <p> . {formatDistanceToNowStrict(new Date(video.createdAt), { addSuffix: true })}</p>
                </div>
            </div>
                <div className="self-start ">
                    <assets.BiDotsVerticalRounded className="text-xl"/>
                </div>
        </div>   
    </>
  )     
}

export default HVideoCard