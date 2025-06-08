import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../store/Reducers/VideoSlice";
import Category from "../components/Category";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import VideoCard from "../components/VideoCard";
import { assets } from "../assets/assets";

function Home() {
  const dispatch = useDispatch();
  const { videos, status, error } = useSelector((state) => state.videos);
  const [fullSideBar, setFullSidebar] = useState(false);

  const handleHomeButton = (e) => {
    e.stopPropagation();
    setFullSidebar((prev) => !prev);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVideos());
    }
  }, [status, dispatch]);

  if (status === "loading")
    return <p className="text-center py-10 text-lg">Loading...</p>;
  if (status === "failed")
    return (
      <p className="text-center py-10 text-red-500">
        Error: {error}
      </p>
    );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white transition-all duration-500">
      {/* === Fixed Navbar === */}
      <header className="h-16 w-full shadow-md bg-white dark:bg-slate-800 fixed top-0 z-50 flex items-center justify-between px-4">
        <Navbar />
      </header>

      {/* === Fixed Category Section === */}
      <div className="h-14 flex items-center px-4 bg-white dark:bg-slate-800 shadow-sm fixed top-20 w-full z-40">
        <div
          onClick={handleHomeButton}
          className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-xl transition-all flex items-center justify-center"
        >
          <assets.IoMenuOutline className="w-7 h-7 text-slate-700 dark:text-white" />
        </div>
        <div className="ml-4 w-full overflow-x-auto scrollbar-hide">
          <Category />
        </div>
      </div>

      {/* === Main Content === */}
      <main className="flex w-full pt-[128px]"> {/* 64px + 56px + 8px spacing */}
        {/* Sidebar */}
        <div className={`${fullSideBar ? "w-[14rem]" : "w-[5rem]"} shrink-0`} >
          <SideBar fullSideBar={fullSideBar} />
        </div>

        {/* Videos */}
        
        <section className="flex-1 px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos?.map((video, index) => (
              <div
                key={index}
                className="w-full h-[260px] rounded-xl overflow-hidden shadow-md hover:shadow-xl bg-white dark:bg-slate-800 transition-all duration-300"
              >
                <VideoCard video={video} index={index} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
