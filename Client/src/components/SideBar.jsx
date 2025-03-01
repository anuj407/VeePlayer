/* eslint-disable react/prop-types */
import { useState } from "react"
import { assets } from "../assets/assets"
function SideBar({fullSideBar}) {
  const [selectOptions,setSelectOptions] =useState("Home")
  
  return (
    <>
       
        {fullSideBar ? 
        <>
          <div className="space-y-2">
            <div onClick={()=>setSelectOptions("Home")} className={`${selectOptions == 'Home' && `bg-[#1f1f1f]`} flex items-center space-x-5 p-2 px-4 hover:bg-[#2f2f2f] rounded-lg cursor-pointer text-2xl`}>
              {selectOptions == 'Home' ? <assets.AiFillHome/> : <assets.LiaHomeSolid/> }
              <span className="text-[1rem]">Home</span>
            </div>
            <div onClick={()=>setSelectOptions("Subscriptions")} className={`${selectOptions == 'Subscriptions' && `bg-[#1f1f1f]`} flex items-center space-x-5 p-2 px-4 hover:bg-[#2f2f2f] rounded-lg cursor-pointer text-2xl`}>
              <assets.PiVideo className="rotate-180"/>
              <span className="text-[1rem]">Subscriptions</span>
            </div>
          </div>
          
          <div className="border-t border-gray-600 pt-3">
            <div className="flex items-center space-x-1 px-4 text-[1.1rem]"><span>You</span> <span className="text-2xl mt-0.5 text-[#AAAAAA]" ><assets.MdChevronRight /></span></div>
            <div className="space-y-2 mt-2">
              <div onClick={()=>setSelectOptions("History")} className={`${selectOptions == 'History' && `bg-[#1f1f1f]`} flex items-center space-x-5 p-2 px-4 hover:bg-[#2f2f2f] rounded-lg cursor-pointer text-2xl`}>
                <assets.LuHistory/>
                <span className="text-[1rem]">History</span>
              </div>
              <div onClick={()=>setSelectOptions("Playlists")} className={`${selectOptions == 'Playlists' && `bg-[#1f1f1f]`} flex items-center space-x-5 p-2 px-4 hover:bg-[#2f2f2f] rounded-lg cursor-pointer text-2xl`}>
                <assets.MdPlaylistPlay/>
                <span className="text-[1rem]">Playlists</span>
              </div>
              <div onClick={()=>setSelectOptions("videos")} className={`${selectOptions == 'videos' && `bg-[#1f1f1f]`} flex items-center space-x-5 p-2 px-4 hover:bg-[#2f2f2f] rounded-lg cursor-pointer text-2xl`}>
                <assets.GoVideo/>
                <span className="text-[1rem]">Your videos</span>
              </div>

              <div onClick={()=>setSelectOptions("Watch")} className={`${selectOptions == 'Watch' && `bg-[#1f1f1f]`} flex items-center space-x-5 p-2 px-4 hover:bg-[#2f2f2f] rounded-lg cursor-pointer text-2xl`}>
                <assets.MdOutlineWatchLater/>
                <span className="text-[1rem]">Watch Later</span>
              </div>
              <div onClick={()=>setSelectOptions("Liked")} className={`${selectOptions == 'Liked' && `bg-[#1f1f1f]`} flex items-center space-x-5 p-2 px-4 hover:bg-[#2f2f2f] rounded-lg cursor-pointer text-2xl`}>
                <assets.BiLike/>
                <span className="text-[1rem]">Liked videos</span>
              </div>
              <div onClick={()=>setSelectOptions("Downloads")} className={`${selectOptions == 'Downloads' && `bg-[#1f1f1f]`} flex items-center space-x-5 p-2 px-4 hover:bg-[#2f2f2f] rounded-lg cursor-pointer text-2xl`}>
                <assets.LiaDownloadSolid/>
                <span className="text-[1rem]">Downloads</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 border-t border-gray-600 pt-4">
            <span className="text-gray-400">Subscriptions</span>
            <div className="space-y-2 mt-2">
              {[].map((channel, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
                  
                  <span>{channel}</span>
                </div>
              ))}
            </div>
          </div>
        </>
       : 
       <>
        
            <div onClick={()=>setSelectOptions("Home")} className={` w-full mx-1 h-16 flex flex-col items-center justify-center cursor-pointer hover:bg-[#2f2f2f] rounded-xl`}>
                {selectOptions == "Home" ? <assets.AiFillHome className="text-2xl"/> : <assets.LiaHomeSolid className="text-2xl"/>}
                <h4 className="text-center">Home</h4>
            </div>
            <div onClick={()=>setSelectOptions("Subscriptions")} className={` w-full mx-1 h-16 flex flex-col items-center justify-center cursor-pointer hover:bg-[#2f2f2f] rounded-xl`}>
                <assets.PiVideo className="text-2xl rotate-180"/>
                <h4 className="text-center ">Subscriptions</h4>
            </div>
            <div onClick={()=>setSelectOptions("You")} className={` w-full mx-1 h-16 flex flex-col items-center justify-center cursor-pointer hover:bg-[#2f2f2f] rounded-xl`}>
                <assets.IoPersonCircleOutline className="text-2xl"/>
                <h4 className="text-center ">You</h4>
            </div>
            <div onClick={()=>setSelectOptions("Download")} className={` w-full mx-1 h-16 flex flex-col items-center justify-center cursor-pointer hover:bg-[#2f2f2f] rounded-xl`}>
                <assets.LiaDownloadSolid className="text-2xl"/>
                <h4 className="text-center ">Download</h4>
            </div>
        </>
        }
    </>
  )
}

export default SideBar