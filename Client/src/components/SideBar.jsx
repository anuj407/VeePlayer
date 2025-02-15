import { assets } from "../assets/assets"
function SideBar() {
  return (
    <>
        <div className="w-28 h-[85.5vh] bg-black flex flex-col gap-8 text-sm fixed top-20 ">
        <div className="w-2/3 mx-auto h-12 flex flex-col items-center justify-center cursor-pointer hover:bg-[#3f3f3f] rounded-xl">
           <assets.IoMenuOutline className="text-3xl" />
        </div>
            <div className="w-2/3 mx-auto h-16 flex flex-col items-center justify-center cursor-pointer hover:bg-[#3f3f3f] rounded-xl">
                <assets.LiaHomeSolid className="text-3xl"/>
                <h4 className="text-center">Home</h4>
            </div>
            <div className="w-8/9 mx-auto h-16 flex flex-col items-center justify-center cursor-pointer hover:bg-[#3f3f3f] rounded-xl">
                <assets.PiVideo className="text-3xl"/>
                <h4 className="text-center">Subscriptions</h4>
            </div>
            <div className="w-2/3 mx-auto h-16 flex flex-col items-center justify-center cursor-pointer hover:bg-[#3f3f3f] rounded-xl">
                <assets.IoPersonCircleOutline className="text-3xl"/>
                <h4 className="text-center">You</h4>
            </div>
        </div>
    </>
  )
}

export default SideBar