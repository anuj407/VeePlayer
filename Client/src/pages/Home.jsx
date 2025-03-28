import { useEffect, useState } from "react"
import Category from "../components/category"
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"
import VideoCard from "../components/VideoCard"
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../store/Reducers/VideoSlice';
import { assets } from "../assets/assets"
function Home() {
  const dispatch = useDispatch();
  const { videos, status, error } = useSelector((state) => state.videos);

  const [fullSideBar,setFullSidebar]=useState(false)
  const handleHomeButton = (event)=>{
      event.stopPropagation();
      setFullSidebar(!fullSideBar)
  }
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchVideos());
    }
  }, [status, dispatch]);
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  return (
    <div className="min-h-screen">
      <div className="w-full h-[5rem]">
        <Navbar/>
      </div>
        <div onClick={handleHomeButton} className="w-[100%] h-12 flex items-center  ">
          <div className="w-[5rem] h-full">
            <div className="fixed left-[2%]">
              <assets.IoMenuOutline className="w-[2.5rem] h-full text-3xl py-1 hover:bg-[#3f3f3f] cursor-pointer  rounded-xl" />
            </div>
          </div>
           <div className="left-[5.5rem] h-16 bg-black flex items-center gap-x-8 fixed top-18 z-20">     
            <div className="w-[92vw] pr-4 flex items-center">                  
                <Category/>
            </div>      
        </div>
        </div>
        <div className="w-full  flex">
            <div className={`${fullSideBar ? `w-[12rem]`:`w-[5.5rem]`} h-[44rem] bg-black flex flex-col gap-8 text-[0.8rem] top-32 py-3 `}>
              <div className="fixed">
              <SideBar fullSideBar={fullSideBar} />
              </div>
            </div>
            <div className={`py-3 w-[95%] pl-2 flex flex-wrap gap-4`}>
            {
              videos?.map((video,index)=>
              <div key={index} className="w-[24%] h-[18rem]">
                <VideoCard index={index} video={video}/>
              </div>
            )
            }
            </div>
        </div>
        
    </div>
  )
}

export default Home