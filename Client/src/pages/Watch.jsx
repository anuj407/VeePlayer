import { useEffect } from "react";
import Category from "../components/Category";
import HVideoCard from "../components/HVideoCard";
import Navbar from "../components/Navbar";
// import SuggestVideo from "../components/SuggestVideo"
import VideoWatch from "../components/VideoWatch";
import { fetchVideos, selectVideos } from "../store/Reducers/VideoSlice";
import { useDispatch, useSelector } from "react-redux";

function Watch() {
  const dispatch = useDispatch();
  const { videos, status } = useSelector(selectVideos);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVideos());
    }
  }, [dispatch, status]);
  return (
    <>
      <Navbar />
      <div className="mt-20 py-4 flex justify-evenly ">
        <VideoWatch />
        <div className="w-[28%] flex flex-col gap-6">
          <div className="">
            <Category />
          </div>
          <div className="flex flex-col gap-3 ">
            {videos.map((video, index) => (
              <HVideoCard key={index} video={video} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Watch;
