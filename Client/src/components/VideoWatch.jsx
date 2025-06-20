import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useEffect, useRef, useState } from "react";
import { apiUrl } from "../utils/constants";
import {  formatDistanceToNowStrict } from "date-fns";
import { useSelector } from "react-redux";
import { selectUser } from "../store/Reducers/UserSlice";
import SignIn_Message from "../components/SignIn_Message.jsx";

function VideoWatch() {
  
  const { isTokenValid } = useSelector(selectUser)
  const { videoId } = useParams();
 
  const commentUrl = `${apiUrl}/comments/add-comment/${videoId}`;
  const commentDeleteUrl = `${apiUrl}/comments/delete-comment`;
  const videoUrl = `${apiUrl}/videos/getVideo/${videoId}`
  const likeUrl = `${apiUrl}/likes`

  
  const [data, avatar, videoData, timeAgo, VideoOwnerAvatar, comments,inputs,setInputs,handleClick,DeleteCommnet, ToggleLike] =  HandleVideoWatch(commentUrl,videoUrl,commentDeleteUrl,likeUrl)
  
  const [signInMsg, setSignInMsg] = useState('')

  const handleLike = (event)=>{
    event.stopPropagation();
    if(!isTokenValid){
      if(signInMsg=='Like')
      {
        setSignInMsg(0)
      }
      else{
        setSignInMsg('Like')
      }
      return
    }
    ToggleLike(videoData[0]?._id)
  }
  const handleComment = (event)=>{
    event.stopPropagation();
    if(!isTokenValid){
      if(signInMsg=='comment')
      {
        setSignInMsg(0)
      }
      else{
        setSignInMsg('comment')
      }
      return
    }
    return
  }
  const [delButton, setDelButton] = useState(false)
  const [CommentIndex , setCommIndex] = useState()
  const handleDelButton =(e)=>{
         setDelButton(!delButton)
         setCommIndex(e)
  }
 const navigate = useNavigate()
  const handleProfile = (event)=>{
    event.stopPropagation();
    navigate(`/profile/${videoData[0]?.owner?.username}`)
}
  return (
    <>
      <div onClick={()=>setSignInMsg(0)} className="w-[70%] flex flex-col gap-2">
        <div className="w-full h-[35rem] rounded-3xl overflow-hidden shadow-[0_0_8px_rgba(0,0,0,0.5)]">
          <video className="w-full h-full" controls src={videoData[0]?.videoFile}></video>
        </div>
        <div className="">
          <h2 className="text-xl font-medium ml-2">{videoData[0]?.title}</h2>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div onClick={handleProfile} className="w-10 h-10 rounded-full overflow-hidden">
                <img className="w-full h-full object-cover" src={VideoOwnerAvatar} alt="" />
              </div>
              <div onClick={handleProfile} className="">
                    <h2 className="font-medium">{videoData[0]?.owner?.fullName}</h2>
                    <p className="text-xs">200 subscribers</p>
              </div>
              <button className="ml-10 px-5 h-9 font-medium rounded-md bg-red-500 text-white">
                Subscribe
              </button>
            </div>
            <div className="flex gap-3 items-center relative">
              <div className="w-[14rem] h-[9rem] absolute z-20 top-10">
                { !isTokenValid && (signInMsg == "Like" && <SignIn_Message title1={"Like this video?"} title={"Sign in to like this Video"}/>)}
              </div>
              <div className="h-9 bg-slate-800 rounded-2xl flex text-2xl items-center overflow-hidden">
                <div onClick={handleLike} className="cursor-pointer h-full flex items-center gap-1.5 px-3 hover:bg-slate-900 hover:shadow-[0_0_10px_rgba(0,0,0,0.5)] ">
                  {videoData[0]?.isLiked ? <assets.BiSolidLike /> : <assets.BiLike />} <span className="text-sm font-medium">{videoData[0]?.totalLikes}</span>
                </div>
                <p className="w-0.5 h-[60%] bg-zinc-500"></p>
                <div className="cursor-pointer h-full px-3 flex items-center hover:bg-slate-900 hover:shadow-[0_0_10px_rgba(0,0,0,0.5)] ">
                  <assets.BiDislike />
                </div>
              </div>
              <button className="h-9 px-3.5 bg-slate-800 rounded-2xl flex items-center gap-2 cursor-pointer hover:bg-slate-900 hover:shadow-[0_0_10px_rgba(0,0,0,0.5)] ">
                <assets.PiShareFat className="text-2xl" />
                <p className="font-medium">Share</p>
              </button>
              <button className="h-9 px-3.5 bg-slate-800 rounded-2xl flex items-center gap-2 cursor-pointer hover:bg-slate-900 hover:shadow-[0_0_10px_rgba(0,0,0,0.5)] ">
                <assets.LiaDownloadSolid className="text-2xl" />
                <p className="font-medium">Download</p>
              </button>
              <assets.BiDotsVerticalRounded className="text-2xl cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="w-full h-20 mt-3 rounded-xl bg-slate-800 p-2">
          <div className="flex gap-2">
            <h3>{videoData[0]?.views} views</h3>
            <h3>{timeAgo}</h3>
          </div>
          <p>{videoData[0]?.description}</p>
        </div>
        {/* Comments part */}
        <div className=" mt-3 relative">
            <div className="w-full flex gap-2 items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  { isTokenValid ? <img className="w-full h-full object-cover" src={avatar} alt="" /> : <assets.IoPersonCircleOutline className="text-3xl" />}
                    
                </div>
                <div className="w-[14rem] h-[9rem] absolute z-20 top-10">
                 {isTokenValid && (signInMsg == "comment" && <SignIn_Message title={"Sign in to Continue"}/>)}
                </div>
                <div  onClick={handleComment} className=" w-full h-10">
                    <input ref={data} disabled={signInMsg}  onChange={()=>setInputs(data.current.value)} className="w-full border-b-2 border-[#2f2f2f] pl-1 outline-0" type="text" name="comment" id="" placeholder="Add a comment" />
                </div>
            </div>
            <div className="w-full flex gap-2.5 justify-end items-center">
                <button className="font-medium px-4 py-1.5 cursor-pointer rounded-full hover:bg-slate-900 hover:shadow-[0_0_10px_rgba(0,0,0,0.5)] ">Cancel</button>
                <button onClick={()=>handleClick()}  className={`font-medium px-4 py-1.5 rounded-full bg-slate-800  ${inputs ? `opacity-[1] hover:bg-slate-900 hover:shadow-[0_0_10px_rgba(0,0,0,0.5)]  cursor-pointer`:`opacity-[0.4]`}`}>Comment</button>
            </div>            
            <div className="py-6 flex flex-col gap-5">
              {comments.map((comment,index)=>
                  <div key={index} className="w-full flex justify-between pr-3">
                    <div className=" flex gap-3">
                      <div className="w-9 h-9 mt-1 rounded-full overflow-hidden">
                        <img className="w-full h-full object-cover" src={comment.commentedBy.avatar} alt="" />
                      </div>
                      <div className="">
                          <h2 className="font-medium">{comment.commentedBy.username} {comment.createdAt}</h2>
                          <p className="py-1">{comment.content}</p>
                          <div className="text-2xl text-[#848282] flex gap-1.5 ">
                              <assets.BiLike className="cursor-pointer"/>
                              <assets.BiDislike className="cursor-pointer"/>
                          </div>
                      </div>
                    </div>
                    <div className=" w-24 relative">
                      <button onClick={()=>DeleteCommnet(index)}  className={`${CommentIndex == index && delButton ? ``:`hidden`} absolute top-1 left-1 px-3 h-8 py-1 bg-[#2f2f2f] rounded-md cursor-pointer hover:bg-slate-900 hover:shadow-[0_0_10px_rgba(0,0,0,0.5)]  text-sm mt-1 `}>delete</button>
                      <span onClick={()=>handleDelButton(index)} className={`float-right w-8 h-8 rounded-full cursor-pointer text-2xl hover:bg-[#2f2f2f] flex justify-center items-center `}><assets.BiDotsVerticalRounded /></span>
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

const HandleVideoWatch =(commentUrl,videoUrl,commentDeleteUrl,likeUrl)=>{
  const {avatar} = useSelector(selectUser)
  const [videoData, setVideoData] = useState([{}]);
  const [timeAgo, setTimeAgo] = useState("");
  const [VideoOwnerAvatar, setOwnerAvatar] = useState()
  const [comments, setComments] = useState([])

// fetch Data Video Data
  const fetchData = async () => {
    try {
      const response = await fetch(`${videoUrl}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setVideoData(result.data);
      setTimeAgo(formatDistanceToNowStrict(new Date(result.data[0].createdAt), { addSuffix: true })); 
      setOwnerAvatar(result.data[0].owner.avatar)
      setComments(result.data[0].comments.map(comment => ({
        ...comment,
        createdAt: formatDistanceToNowStrict(new Date(comment.createdAt), { addSuffix: true })
      })))
    } catch (error) {
      console.error(error);
    }
  }
//  add Comments 
  const data = useRef(null)
  const [inputs, setInputs] = useState()
  const handleClick = async()=>{
    if(inputs){
     try {
       const response = await fetch(`${commentUrl}`, {
         method: 'POST',
         credentials: 'include',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           content: inputs
         })
       });
       if(response.status==201){
        data.current.value=''
        fetchData()
       }
     } catch (error) {
        console.error(error);
     }
    }
  }

  const DeleteCommnet = async(index)=>{
    try {
      const response = await fetch(`${commentDeleteUrl}/${comments[index]._id}`, {
        method: 'delete',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.status==200){
        fetchData()
       }
    } catch (error) {
        console.error(error);
    }
  }
// Video Like 
 const ToggleLike = async (videoId)=>{
   try {
     const response = await fetch(`${likeUrl}/toggle-video-like/${videoId}`, {
       method: 'post',
       credentials: 'include',
       headers: {
         'Content-Type': 'application/json',
       },
     });
     if(response.status==200 || response.status== 201){
       fetchData()
      }
   } catch (error) {
       console.error(error);
   }
 }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, avatar, videoData, timeAgo, VideoOwnerAvatar, comments,inputs,setInputs,handleClick,DeleteCommnet, ToggleLike]
}