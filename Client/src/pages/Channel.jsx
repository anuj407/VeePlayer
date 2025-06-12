import { useDispatch, useSelector } from "react-redux"
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"
import { fetchProfile, getChannel } from "../store/Reducers/ChannelSlice"
import { useEffect, useState } from "react"
import HVideoCard from "../components/HVideoCard"
import VideoCard from "../components/VideoCard"
import Channel_HomeVideo from "../components/Channel_HomeVideo"
import { fetchUserVideos } from "../store/Reducers/UserVideoSlice"
import { fetchVideos } from "../store/Reducers/VideoSlice"
import { useParams } from "react-router-dom"

function Channel() {

  const {_id,fullName,avatar,coverImage,subscribersCount,} = useSelector(getChannel)
  const userVideos = useSelector((state) => state.userVideos.videos);
  const dispatch = useDispatch()
  const {username}=useParams()

  const [select,setSelect]= useState(0)
  // Fetch Videos
  useEffect(() => {
    dispatch(fetchVideos());
    if (_id) {
      dispatch(fetchUserVideos(_id));
    }
  }, [dispatch, _id]);

  // Effect for profile only when userVideos has data
  useEffect(() => {
      const params = { username: username, userId: userVideos[0]?.owner?._id };
      dispatch(fetchProfile(params));
  }, [dispatch, userVideos, username]);
  return (
    <>
        <div className="w-full min-h-screen overflow-hidden">
            <div className="w-screen h-[5rem] "></div>
            <Navbar/>
            <div className="flex">
                <div className="w-[5.5rem] min-h-[46rem]">
                  <div className="fixed">
                    <SideBar/>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2 items-center ">
                    <div className="w-[90%] border mx-auto h-[10rem] rounded-2xl overflow-hidden">
                      <img className="w-full h-full object-cover" src={coverImage} alt="" />
                    </div>
                    <div className="w-[90%] h-[12rem] flex items-center gap-5 ">
                        <div className="">
                           <div className="w-[10rem] h-[10rem] rounded-full overflow-hidden ">
                              <img className="w-full h-full object-cover" src={avatar} alt="" />
                           </div>
                        </div>
                        <div className="w-fit h-full flex flex-col justify-center gap-1">
                            <h4 className="text-[2.3rem] font-bold">{fullName}</h4>
                            <div className="text-[#AAAAAA] flex gap-2">
                                <span className="text-white">@{username} </span>
                                <span >. {subscribersCount}  subscribers</span>
                                <span>. Total Videos</span>
                            </div>
                            <div className="text-[#AAAAAA]">Description akjfa, aksdfdjal a,serjpoawn </div>
                            <div className="">
                              <button className="px-4 py-[5px] mt-1.5 rounded-3xl text-black font-medium bg-white cursor-pointer hover:bg-[#d5d3d3]">Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-10 flex gap-10 border-b-[0.7px] border-[#6a6969] pl-[5%] text-[1.15rem] pb-2 ">
                      {["Home","Videos","Playlists","Posts"].map((item,index)=><button onClick={()=>setSelect(index)} key={index} className={` cursor-pointer font-medium hover:border-b-2 hover:border-[#AAAAAA] ${index == select ? `text-white border-b-2`:`text-[#AAAAAA]`}`}>{item}</button>)}
                    </div>
                    {/* Home              */}
                    {select == 0 &&               
                      <div className="w-[90%] py-6 flex flex-col items-center gap-6 ">  
                          <div className="w-full mx-auto ">            
                            {userVideos?.map((video,index)=>
                              <div key={index} className={`w-4/6 h-[16rem] ${index == 1 ? `block`:`hidden`}`}>
                                <HVideoCard  video={video} />
                              </div>
                            )}
                          </div> 
                          <div className="w-full h-[0.8px] bg-[#616161]"></div>
                          <div className="w-full">
                              <h1 className="text-xl font-semibold" >For You</h1>
                              <div className="flex gap-3 mt-2 h-[16rem]">
                                {userVideos?.map((video,index)=><div key={index} className={`${index < 3 ? `block`:`hidden`} w-[23%]`}><VideoCard video={video}/></div>
                                )}
                              </div>
                          </div>
                          <div className="w-full h-[0.8px] bg-[#616161]"></div>
                          <div className="w-full">
                            <Channel_HomeVideo/>
                          </div>
                      </div>
                    }
                    {/* Videos              */}
                    {select == 1 &&
                    <div className="w-[90%] flex mt-2 gap-2">
                     { userVideos?.map((video, index)=><VideoCard key={index} video={video}/>)}
                    </div>
                    }
                </div>
            </div>   
        </div>
    </>
  )
}

export default Channel