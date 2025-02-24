import { useDispatch, useSelector } from "react-redux"
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"
import { getChannel } from "../store/Reducers/ChannelSlice"
import { useEffect } from "react"
import VideoCard from "../components/VideoCard"
import { fetchVideos } from "../store/Reducers/VideoSlice"

function Channel() {

  const {fullName,email,username,avatar,coverImage,subscribersCount,} = useSelector(getChannel)
  console.log(fullName,email,username,avatar,coverImage);
  const { videos } = useSelector((state) => state.videos);
  const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(fetchVideos())
  },[dispatch])
  return (
    <>
        <div className="w-full min-h-screen">
            <div className="w-screen h-[5rem]"></div>
            <Navbar/>
            <div className="flex">
                <div className="w-[7.5rem] min-h-[46rem] relative">
                  <SideBar/>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <div className="w-[98%] mx-auto h-[10rem] bg-red-500 rounded-2xl"></div>
                    <div className="w-full h-[11rem] border flex">
                        <div className="w-[12%]">
                           <div className="w-[10rem] h-[10rem] rounded-full overflow-hidden ">
                              <img className="w-full h-full object-cover" src={avatar} alt="" />
                           </div>
                        </div>
                        <div className="w-fit h-full ">
                        <h4>{fullName}</h4>
                               <div className="">
                                <span>{username} </span>
                                  <span>. Subscribers {subscribersCount}</span>
                                  <span>. Total Videos</span>
                               </div>
                               <div className="">Description</div>
                               <div className="">
                                <button>Button 1</button>
                                <button>Button 2</button>
                               </div>
                        </div>
                    </div>
                    <div className=""></div>
                </div>
            </div>
            <div className="hidden">
               {videos.map((video,index)=><VideoCard key={index} video={video} />)}
            </div>
        </div>
    </>
  )
}

export default Channel