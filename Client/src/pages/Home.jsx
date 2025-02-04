import { useEffect } from "react"
import Category from "../components/category"
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"
import VideoCard from "../components/VideoCard"
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../store/Reducers/VideoSlice';
function Home() {
  const dispatch = useDispatch();
  const { videos, status, error } = useSelector((state) => state.videos);

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
        <Category/>
        <SideBar/>
        <div className="w-[91.5vw] py-3 pl-1 mt-32 ml-28 flex flex-wrap gap-4">
        {
          videos.map((video,index)=><VideoCard key={index} index={index} video={video}/>)
        }
        </div>
    </div>
  )
}

export default Home