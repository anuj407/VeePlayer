/* eslint-disable react/prop-types */
import { useCallback, useRef, useState } from "react";
import {assets} from "../assets/assets.js"
import {useDropzone} from 'react-dropzone'
function VideoUploadPop_up({updateParent}) {

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("Select Files");
             
  // const [title, setTitle] = useState("r9w10aa8n7wclwtupigj");


  const [isUploading, setIsUploading] = useState(false);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name)
      setInterval(()=>{
        setIsUploading(true)
      },1000)
    }
  };
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles)
    if(acceptedFiles){
      setInterval(()=>{
        setIsUploading(true)
      },1000)
    }
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})
  return (
    <>
      <div className={`w-[70vw] h-[90vh] bg-[#222222] rounded-xl flex flex-col ${isUploading ? `gap-7` : `gap-12`}`}>
          <div className="h-[8%] border-b flex justify-between items-center p-2 px-6 font-medium text-[1.1rem]">
            <h1 className="">Upload Video</h1>
            <div onClick={updateParent} className="text-2xl cursor-pointer">
                <assets.RxCross2 />
            </div>
          </div>
          {isUploading ?
              <div className="flex h-[83%] border flex-col items-center">
                <div className="w-[80%] h-[10%] border flex justify-between relative">
                  <div className="w-[15%] hover:bg-[#3f3f3fab] cursor-pointer flex flex-col items-center justify-center gap-y-1 z-10">
                    <h1>Details</h1>
                    <assets.IoIosCheckmarkCircle className="text-xl"/>
                  </div>
                  <div className="w-[15%] hover:bg-[#3f3f3fab] cursor-pointer flex flex-col items-center justify-center gap-y-1 z-10">
                    <h1>Video Element</h1>
                    <assets.FaCircleDot className="text-xl"/>
                  </div>
                  <div className="w-[15%] hover:bg-[#3f3f3fab] cursor-pointer flex flex-col items-center justify-center gap-y-1 z-10">
                    <h1>Checks</h1>
                    <assets.IoIosCheckmarkCircle className="text-xl"/>
                  </div>
                  <div className="w-[15%] hover:bg-[#3f3f3fab] cursor-pointer flex flex-col items-center justify-center gap-y-1 z-10">
                    <h1>Visibility</h1>
                    <assets.FaCircleDot className="text-xl"/>
                  </div>
                  <div className="w-[27%] h-[2px] bg-[#b0adad] absolute left-[8%] top-[70%] z-0"></div>
                  <div className="w-[27%] h-[2px] bg-[#b0adad] absolute left-[37%] top-[70%] z-0"></div>
                  <div className="w-[27%] h-[2px] bg-[#b0adad] absolute left-[65%] top-[70%] z-0"></div>

                </div>
                <div className="">
                  <div className=""></div>
                  <div className=""></div>
                </div>
              </div>
           :
            <form className="h-4/5 flex flex-col items-center justify-center gap-7">
              <div {...getRootProps()}
                className="w-[13rem] h-[13rem] flex justify-center items-center cursor-pointer rounded-full bg-[#2e2e2e]"
                onClick={handleDivClick}
              >
                <input {...getInputProps()} />
                <assets.MdFileUpload className="text-[6rem]" />
              </div>
              <div className="text-[1.5rem] text-[#cdcdcd]">
                <p>Drag and drop video files to upload</p>
              </div>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  className="bg-white text-black px-6 text-[1.1rem] font-medium py-[5px] cursor-pointer rounded-md"
                  onClick={handleDivClick}
                >
                  {fileName}
                </button>
              </div>
            </form> 
          }
      </div>   
    </>
  )
}

export default VideoUploadPop_up