import { useParams } from "react-router-dom"
import { assets } from "../assets/assets"
import { useEffect, useState } from "react"
import { apiUrl } from "../utils/constants"
function VideoWatch() {
    const {videoId} = useParams()
    const [videoData, setVideoData] = useState([{}])
    const fetchData =async ()=>{
        try {
            const response = await fetch(`${apiUrl}/videos/getVideo/${videoId}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            })
            const result = await response.json()
            setVideoData(result.data)
        } catch (error) {
            console.error(error)
        }
    }
     useEffect(()=>{
         fetchData()
     })
  return (
    <>
        <div className=" w-[70%] flex flex-col gap-2">
           <div className="w-full h-[35rem] rounded-3xl ">
            <video className="w-full h-full" controls src={videoData[0].videoFile}></video>
           </div>
           <div className="">
                <h2 className="text-xl font-medium ml-2">{videoData[0].title}</h2>
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full bg-amber-300"></div>
                        <div className="">
                            <h2 className="font-medium">Channel Name</h2>
                            <p className="text-xs">200 subscribers</p>
                        </div>
                        <button className="ml-10 px-5 h-9 font-medium rounded-md bg-red-500 text-white">Subscribe</button>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="h-9 bg-[#222222] rounded-2xl flex text-2xl items-center overflow-hidden">
                            <div className="cursor-pointer h-full flex items-center gap-1.5 px-3 hover:bg-[#3f3f3f]"><assets.BiLike/> <span className="text-sm font-medium">124k</span></div>
                            <p className="w-0.5 h-[60%] bg-zinc-500"></p>
                            <div className="cursor-pointer h-full px-3 flex items-center hover:bg-[#3f3f3f]"><assets.BiDislike/> </div>
                        </div>
                        <button className="h-9 px-3.5 bg-[#222222] rounded-2xl flex items-center gap-2 cursor-pointer hover:bg-[#3f3f3f]">
                            <assets.PiShareFat className="text-2xl"/> 
                            <p className="font-medium">Share</p>
                        </button>
                        <button className="h-9 px-3.5 bg-[#222222] rounded-2xl flex items-center gap-2 cursor-pointer hover:bg-[#3f3f3f]">
                            <assets.LiaDownloadSolid className="text-2xl"/> 
                            <p className="font-medium">Download</p>
                        </button>
                        <assets.BiDotsVerticalRounded className="text-2xl cursor-pointer"/>
                    </div>
                </div>
           </div>
           <div className="w-full h-20 mt-3 rounded-xl bg-[#222222] p-2">
            <p>Description - welcome to my Channel </p>
           </div>
           <div className="w-full">
               <div className="w-10 h-10 rounded-full bg-amber-300"></div>
               <div className="">
                   <input type="text" name="comment" id="" />
               </div>
           </div>
        </div>
    </>
  )
}

export default VideoWatch