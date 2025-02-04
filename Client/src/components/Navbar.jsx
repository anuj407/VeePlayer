import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import {assets} from '../assets/assets'
import { auth } from './Firebase'
import { useEffect, useState,  } from 'react';

function Navbar() {
  
  const googleSignIn = async()=>{
    try{
      // Sign in with Google
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      const userData = {
        username: user.uid,
        fullName: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
    const respose = await fetch("http://localhost:8080/api/v1/users/register", {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if(respose.status==200){
        window.location.href = "/profile"
      }
    }
    catch(error){
      console.error(error);
    }
    
  }
  const googleSignOut = async()=>{
    try{
      // Sign out from server
      await fetch("http://localhost:8080/api/v1/users/logout", {
        method: "POST",
        credentials: 'include',
      });
  
      // Sign out from Firebase
      await signOut(auth).then(()=>{
        window.location.href = "/";
      })

    }
    catch(error){
      console.error(error);
    }
  }
  const [token,setToken]= useState(false)
  const refreshToken = async()=>{
    try{
      const response = await fetch("http://localhost:8080/api/v1/users/me", {
        method: "get",
        credentials: 'include',
      });
      const data = await response.json();
      if(data.refreshToken){
        setToken(true)
      }
    }
    catch(error){
      console.error(error);
    }
  }
  
    useEffect(()=>{
      if(window.location.href != 'http://localhost:5173/'){
        refreshToken()
      }
    },[])
   
  
  return (
    <>
        <div className="w-screen h-[5rem] -mt-0.5 px-5 bg-black flex justify-between items-center fixed top-0 z-20">
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
           <button onClick={()=>googleSignIn()} className={`${token ? `hidden` :`` } w-[6.5rem] h-10 border-2 border-[#3f3f3f] rounded-full hover:bg-[#222222] hover:border-none cursor-pointer flex items-center justify-center gap-1`}>
             <assets.IoPersonCircleOutline className="text-xl"/>
             <span className="text-sm font-medium ">Sign in</span>
           </button>
           {/* After Login  */}
           <div className={`${token ? `` :`hidden` } h-10 flex items-center justify-center gap-5`}>
            <button className="w-[7rem] h-[2.4rem] rounded-full bg-[#222222] hover:bg-[#3f3f3f]  cursor-pointer flex items-center justify-center gap-1">
              <span className="text-xl"><assets.BsPlusLg/></span>
              <span className="font-medium">Create</span>
            </button>
            <assets.IoNotificationsSharp className="text-2xl"/>
            <div className="w-[2rem] h-[2rem] rounded-full">
              {
              // data ? <img src={avatar} alt={avatar}/> :
               <assets.IoPersonCircleOutline className='w-full h-full'/>  
              }
            </div>
           </div>
        </div>
        <div className={`${token ? '' :`hidden`} w-[14rem] h-[14rem] bg-[#222222] rounded-xl absolute right-6 top-16`}>
            <div className="flex items-center gap-x-2 p-3">
               <assets.IoPersonCircleOutline className='w-10 h-10'/> 
               <div className="">
                  <h3>Full Name</h3>
                  <p>@Email123</p>
               </div>
            </div>
            <button className="w-full text-blue-400 mt-1.5 text-center cursor-pointer">View your channel</button>
            <p className="w-full h-[2px] bg-[#3f3f3f] mt-2"></p>
            <div className="flex flex-col mt-2">
              <div className="h-10 flex items-center gap-x-2 hover:bg-[#3f3f3f] pl-3">
                <assets.PiSignInBold className='text-2xl font-thin'/>
                <button onClick={()=>googleSignOut()} className='w-full text-white cursor-pointer text-start'>Sign out</button>
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

export default Navbar