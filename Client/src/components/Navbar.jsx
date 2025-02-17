import {assets} from '../assets/assets'
import { auth } from './Firebase'
import { useEffect, useState,  } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { selectUser } from '../store/Reducers/UserSlice';
import { googleSignIn, googleSignOut, refreshToken } from '../utils/handleUser';

function Navbar() {
 
  const {avatar,fullName,username}= useSelector(selectUser)
  const [handleSignIn,handleSignOut,isTokenValid,handleProfile,showMenu]= HandleNavbar()
  
  return (
    <>
        <div className="w-screen h-[5rem] -mt-0.5 px-5 bg-black flex justify-between items-center fixed top-0 z-30">
           <div className="flex items-center pl-5">
              <div className="flex items-center gap-1">
                  <img className="w-14" src={assets.logo} alt="" />
                  <h4 className="text-white text-xl font-semibold">VeePlayer</h4>
              </div>
           </div>
           
           <div className="w-1/3 h-[2.5rem] border border-[#222222] rounded-full flex justify-between pl-5 overflow-hidden">
              <input className="w-full outline-0" type="text" placeholder="Search" />
              <button className="bg-[#222222] px-4  ">
                <assets.FiSearch className="text-xl"/>
              </button>
           </div>
           
           {/* Before Login  */}
           <button onClick={()=>handleSignIn()} className={`${isTokenValid ? `hidden` :`` } w-[6.5rem] h-10 border-2 border-[#3f3f3f] rounded-full hover:bg-[#222222] hover:border-none cursor-pointer flex items-center justify-center gap-1`}>
             <assets.IoPersonCircleOutline className="text-xl"/>
             <span className="text-sm font-medium ">Sign in</span>
           </button>
           {/* After Login  */}
           <div className={`${isTokenValid ? `` :`hidden` } h-10 flex items-center justify-center gap-5`}>
            <button className="w-[7rem] h-[2.4rem] rounded-full bg-[#222222] hover:bg-[#3f3f3f]  cursor-pointer flex items-center justify-center gap-1">
              <span className="text-xl"><assets.BsPlusLg/></span>
              <span className="font-medium">Create</span>
            </button>
            <assets.IoNotificationsSharp className="text-2xl"/>
            <div onClick={()=>handleProfile()} className="w-[2rem] h-[2rem] rounded-full cursor-pointer overflow-hidden">              
               <img className='w-full h-full object-cover' src={avatar} />       
            </div>
           </div>
        </div>
        <div className={`${showMenu ? '' :`hidden`} w-[14rem] h-[14rem] bg-[#222222] rounded-xl absolute right-6 top-16 z-50`}>
            <div className="flex items-center gap-x-2 p-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <img className="w-full h-full object-cover" src={avatar} alt="" />
              </div>
               <div className="">
                  <h3>{fullName}</h3>
                  <p>{username}</p>
               </div>
            </div>
            <button className="w-full text-blue-400 mt-1.5 text-center cursor-pointer">View your channel</button>
            <p className="w-full h-[2px] bg-[#3f3f3f] mt-2"></p>
            <div className="flex flex-col mt-2">
              <div className="h-10 flex items-center gap-x-2 hover:bg-[#3f3f3f] pl-3">
                <assets.PiSignInBold className='text-2xl font-thin'/>
                  <button onClick={()=>handleSignOut()} className='w-full text-white cursor-pointer text-start'>Sign out</button>
              </div>
              <div className="h-10 flex items-center gap-x-2 hover:bg-[#3f3f3f] pl-3">
                <assets.IoSettingsOutline className='text-2xl font-thin'/>
                <button className='w-full text-white cursor-pointer text-start'>Settings</button>
              </div>
            </div>
        </div>
    </>
  )
}

export default Navbar;

const HandleNavbar = ()=>{
  const dispatch = useDispatch();
  const {isTokenValid} = useSelector(selectUser)

  const handleSignIn = ()=>{
        googleSignIn(auth, dispatch)
  }
  const handleSignOut= ()=>{
    googleSignOut(auth)
  }
    
  const [showMenu,setShowMenu] = useState(false)
  const handleProfile = ()=>{
    setShowMenu(!showMenu)
  }
  useEffect(()=>{
      refreshToken(dispatch)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 
  
  return [handleSignIn,handleSignOut,isTokenValid,handleProfile,showMenu]
}