/* eslint-disable react/prop-types */
import {assets} from "../assets/assets.js"
function VideoUploadPop_up({updateParent}) {
  return (
    <>
       <div className="w-[70vw] h-[90vh] bg-[#222222] rounded-xl flex flex-col gap-12">
          <div className="h-[8%] border-b flex justify-between items-center p-2 px-6 font-medium text-[1.1rem]">
            <h1 className="">Upload Video</h1>
            <div onClick={updateParent} className="text-2xl cursor-pointer">
                <assets.RxCross2 />
            </div>
          </div>
          <div className="h-4/5 flex flex-col items-center justify-center gap-7">
            <div className="w-[13rem] h-[13rem] flex justify-center items-center cursor-pointer rounded-full bg-[#2e2e2e] ">
                <assets.MdFileUpload className="text-[6rem]" />
            </div>
            <div className="text-[1.5rem] text-[#cdcdcd]">
                <p>Drag and drop video files to upload</p>
            </div>
            <div className="">
                <button className="bg-white text-black px-6 text-[1.1rem] font-medium
                 py-[5px] cursor-pointer rounded-md" >Select</button>
            </div>
          </div>
        </div>   
    </>
  )
}

export default VideoUploadPop_up