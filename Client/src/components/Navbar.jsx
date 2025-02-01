import {assets} from '../assets/assets'
function Navbar() {
  return (
    <>
        <div className="w-screen h-[5rem] px-5 flex justify-between items-center">
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
           <button className="w-[6.5rem] h-10 border-2 border-[#3f3f3f] rounded-full hover:bg-[#222222] hover:border-none cursor-pointer flex items-center justify-center gap-1">
             <assets.IoPersonCircleOutline className="text-xl"/>
             <span className="text-sm font-medium ">Sign in</span>
           </button>
           {/* After Login  */}
           {/* <div className="h-10 flex items-center justify-center gap-5">
            <button className="w-[7rem] h-[2.4rem] rounded-full bg-[#222222] hover:bg-[#3f3f3f]  cursor-pointer flex items-center justify-center gap-1">
              <span className="text-xl"><assets.BsPlusLg/></span>
              <span className="font-medium">Create</span>
            </button>
            <assets.IoNotificationsSharp className="text-2xl"/>
            <div className="w-[2rem] h-[2rem] rounded-full">
               <assets.IoPersonCircleOutline className='w-full h-full'/>  
            </div>
           </div> */}
        </div>
    </>
  )
}

export default Navbar