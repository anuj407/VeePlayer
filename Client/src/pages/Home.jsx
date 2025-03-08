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
        <Navbar/>
        <div onClick={handleHomeButton} className="w-[5.5rem] fixed left-0 top-[5rem] h-12 flex items-center justify-center ">
           <assets.IoMenuOutline className="w-[80%] h-[80%] py-1 hover:bg-[#3f3f3f] cursor-pointer  rounded-xl" />
        </div>
        <div className={`${fullSideBar ? `w-[16%] px-4`:`w[5rem]`} bg-black flex flex-col gap-8 text-[0.8rem] fixed top-32 py-3 `}>
           <SideBar fullSideBar={fullSideBar} />
        </div>
        <div className="left-[5.5rem]  h-16 bg-black flex items-center gap-x-8 fixed top-18 z-20">     
            <div className="w-[92vw] pr-4 flex items-center">                  
                <Category/>
            </div>      
        </div>
        <div className={`py-3 pl-1 mt-32 ${fullSideBar ? `ml-[16%]` :`ml-[5.8rem]`} flex flex-wrap gap-4`}>
        {
          videos?.map((video,index)=><VideoCard key={index} index={index} video={video}/>)
        }
        </div>
    </div>
  )
}

export default Home