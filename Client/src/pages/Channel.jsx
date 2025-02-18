import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"

function Channel() {
  return (
    <>
        <div className="w-full min-h-screen">
            <div className="w-screen h-[5rem]"></div>
            <Navbar/>
            <div className="flex">
                <div className="w-[7.5rem] min-h-[46rem] relative">
                  <SideBar/>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <div className="w-[98%] mx-auto h-[10rem] bg-red-500 rounded-2xl"></div>
                    <div className="w-full h-[11rem] border flex">
                        <div className="w-[12%]">
                           <div className="w-[10rem] h-[10rem] bg-green-500 rounded-full">
                               <h4>Full Name</h4>
                               <div className="">
                                  <span>Username</span>
                                  <span>Subscribers</span>
                                  <span>Total Videos</span>
                               </div>
                               <div className="">Description</div>
                               <div className="">
                                <button>Button 1</button>
                                <button>Button 2</button>
                               </div>
                           </div>
                        </div>
                        <div className="w-fit h-full "></div>
                    </div>
                    <div className=""></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Channel