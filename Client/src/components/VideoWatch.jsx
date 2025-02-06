import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useEffect, useState } from "react";
import { apiUrl } from "../utils/constants";
import { formatDistanceToNow } from "date-fns";

function VideoWatch() {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState([{}]);
  const [timeAgo, setTimeAgo] = useState("");
  const [avatar, setAvatar] = useState()
  const [comments, setComments] = useState([])
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/videos/getVideo/${videoId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setVideoData(result.data);
      console.log(result.data);
      setTimeAgo(formatDistanceToNow(new Date(result.data[0].createdAt), { addSuffix: true })); 
      setAvatar(result.data[0].owner.avatar)
      setComments(result.data[0].comments)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-[70%] flex flex-col gap-2">
        <div className="w-full h-[35rem] rounded-3xl ">
          <video className="w-full h-full" controls src={videoData[0].videoFile}></video>
        </div>
        <div className="">
          <h2 className="text-xl font-medium ml-2">{videoData[0].title}</h2>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full">
                <img className="w-full h-full object-cover" src={avatar} alt="" />
              </div>
              <div className="">
                    <h2 className="font-medium">{videoData[0].owner?.fullName}</h2>
                    <p className="text-xs">200 subscribers</p>
              </div>
              <button className="ml-10 px-5 h-9 font-medium rounded-md bg-red-500 text-white">
                Subscribe
              </button>
            </div>
            <div className="flex gap-3 items-center">
              <div className="h-9 bg-[#222222] rounded-2xl flex text-2xl items-center overflow-hidden">
                <div className="cursor-pointer h-full flex items-center gap-1.5 px-3 hover:bg-[#3f3f3f]">
                  <assets.BiLike /> <span className="text-sm font-medium">{videoData[0].totalLikes}</span>
                </div>
                <p className="w-0.5 h-[60%] bg-zinc-500"></p>
                <div className="cursor-pointer h-full px-3 flex items-center hover:bg-[#3f3f3f]">
                  <assets.BiDislike />
                </div>
              </div>
              <button className="h-9 px-3.5 bg-[#222222] rounded-2xl flex items-center gap-2 cursor-pointer hover:bg-[#3f3f3f]">
                <assets.PiShareFat className="text-2xl" />
                <p className="font-medium">Share</p>
              </button>
              <button className="h-9 px-3.5 bg-[#222222] rounded-2xl flex items-center gap-2 cursor-pointer hover:bg-[#3f3f3f]">
                <assets.LiaDownloadSolid className="text-2xl" />
                <p className="font-medium">Download</p>
              </button>
              <assets.BiDotsVerticalRounded className="text-2xl cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="w-full h-20 mt-3 rounded-xl bg-[#222222] p-2">
          <div className="flex gap-2">
            <h3>{videoData[0].views} views</h3>
            <h3>{timeAgo}</h3>
          </div>
          <p>{videoData[0].description}</p>
        </div>
        <div className="h-[10rem] mt-3">
            <div className="w-full flex gap-2 items-center">
                <div className="w-10 h-10 rounded-full bg-amber-300">
                    
                </div>
                <div className=" w-full h-10">
                    <input className="w-full border-b-2 border-[#2f2f2f] pl-1 outline-0" type="text" name="comment" id="" placeholder="Add a comment" />
                </div>
            </div>
            <div className="w-full flex gap-2.5 justify-end items-center">
                <button className="font-medium px-4 py-1.5  cursor-pointer rounded-full hover:bg-[#2f2f2f]">Cancel</button>
                <button className="font-medium px-4 py-1.5 cursor-pointer rounded-full bg-[#222222] hover:bg-[#3f3f3f]">Comment</button>
            </div>
            <div className="py-6">
              {comments.map((comment,index)=>
                  <div key={index} className="w-full flex gap-2">
                  <div className="w-9 h-9 bg-amber-200 rounded-full">
                  <img className="w-full h-full object-cover" src={comment.commentedBy.avatar} alt="" />
                  </div>
                  <div className="">
                      <h2 className="font-medium">{comment.commentedBy.fullName}</h2>
                      <p className="py-1">{comment.content}</p>
                      <div className="text-2xl text-[#848282] flex gap-1.5">
                          <assets.BiLike className="cursor-pointer"/>
                          <assets.BiDislike className="cursor-pointer"/>
                      </div>
                  </div>
              </div>
              )}  
            </div>
        </div>
      </div>
    </>
  )
}

export default VideoWatch;