import { assets } from "../assets/assets"
function SideBar() {
  return (
    <>
        <div className="w-28 h-[85.5vh] border-r-2 border-[#222222] flex flex-col gap-10 text-sm">
            <div className="mt-10 w-full flex flex-col items-center cursor-pointer">
                <assets.LiaHomeSolid className="text-3xl"/>
                <h4 className="text-center">Home</h4>
            </div>
            <div className="w-full flex flex-col items-center cursor-pointer">
                <assets.PiVideo className="text-3xl"/>
                <h4 className="text-center">Subscriptions</h4>
            </div>
            <div className=" w-full flex flex-col items-center cursor-pointer">
                <assets.IoPersonCircleOutline className="text-3xl"/>
                <h4 className="text-center">You</h4>
            </div>
        </div>
    </>
  )
}

export default SideBar