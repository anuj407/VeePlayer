/* eslint-disable react/prop-types */
import { useCallback, useRef, useState } from "react";
import {assets} from "../assets/assets.js"
import {useDropzone} from 'react-dropzone'
function VideoUploadPop_up({updateParent}) {

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("Select Files");
 //Progress Evaluate
 const [Progress, setProgress]=useState(0)
 const [step , setStep]= useState("Details")
 const HandleSteps=(stepValue)=>{
    setStep(stepValue)
    if(stepValue=="Video"){
      setProgress(1)
    }
    else if(stepValue=="Checks"){
      setProgress(2)
    }
    else if(stepValue=="Visibility"){
      setProgress(3)
    }
    else{
      setProgress(0)
    }
 }
 const [checks, setChecks] =useState(false)
 const handleChecks=()=>{
     HandleSteps("Checks")
     setInterval(()=>{
       setChecks(true)
     },[2000])
 }
 //Title Input
 const [titleValid,setTitleValid]=useState(true)
 const [titleSize,setTitleSize]=useState(0)
 const inputRef = useRef(null)
 const handleChange =()=>{
    setTitleSize(inputRef.current.value.length)
    setFileName(inputRef.current.value)
    if(inputRef.current.value.length>100){
       setTitleValid(false)
    }
    else{
       setTitleValid(true)
    }
 }
 const [descValid,setDescValid]=useState(true)
 const [descSize,setDescSize]=useState(0)
 const DescinputRef = useRef(null)
 const handleDescChange =()=>{
  setDescSize(DescinputRef.current.value.length)
    if(DescinputRef.current.value.length>5000){
      setDescValid(false)
    }
    else{
      setDescValid(true)
    }
 }
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
      <div className={`w-[65vw] h-[90vh] bg-[#282828] rounded-3xl flex flex-col ${isUploading ? `gap-7` : `gap-12`} `}>
          <div className="h-[8%] border-b border-[#8f8f8f] flex justify-between items-center p-2 px-6 font-medium text-[1.1rem]">
            <h1 className="">{fileName == "Select Files" ? `Upload Video` : `${fileName}`}</h1>
            <div onClick={updateParent} className="text-2xl cursor-pointer">
                <assets.RxCross2 />
            </div>
          </div>
          {isUploading ?
              <div className="flex h-[83%] flex-col items-center gap-y-6 overflow-y-scroll scrollbar-hide relative overflow-x-hidden">
                <div className="w-[60%] h-[8%] fixed bg-[#282828] z-20">
                  <div className="w-full  h-full flex justify-between relative">
                    <div onClick={()=>HandleSteps("Details")} className={`${titleValid ? `text-white` : `text-red-400`} font-medium w-[15%] hover:bg-[#3f3f3fab] cursor-pointer flex flex-col items-center justify-center gap-y-1 z-10`}>
                      <h1 >Details</h1>
                      {step == "Details" ? <assets.FaCircleDot className="text-2xl"/> :
                      <assets.IoIosCheckmarkCircle className="text-xl"/>
                      }
                    </div>
                    <div onClick={()=>HandleSteps("Video")} className={`${Progress >= 1  ? `text-[#b0adad]` :`text-[#575656]`} font-medium w-[15%] hover:bg-[#3f3f3fab] cursor-pointer flex flex-col items-center justify-center gap-y-1 z-10`}>
                      <h1>Video Element</h1>
                      {step == "Video" ? <assets.FaCircleDot className="text-2xl"/> :
                      <assets.FaCircleDot className="text-xl"/>
                      }
                    </div>
                    <div onClick={()=>handleChecks()} className={`${checks ? `text-[#b0adad]` :`text-[#575656]`} font-medium w-[15%] hover:bg-[#3f3f3fab] cursor-pointer flex flex-col items-center justify-center gap-y-1 z-10`}>
                      <h1>Checks</h1>
                      {checks ? <assets.IoIosCheckmarkCircle className="text-2xl"/> :
                      <assets.FaCircleDot className={`${step == "Checks" ?`text-2xl` : `text-xl`}`}/>
                      }
                    </div>
                    <div onClick={()=>HandleSteps("Visibility")} className={`${Progress >= 3  ? `text-[#b0adad]` :`text-[#575656]`} font-medium w-[15%] hover:bg-[#3f3f3fab] cursor-pointer flex flex-col items-center justify-center gap-y-1 z-10`}>
                      <h1>Visibility</h1>
                      {step == "Visibility" ? <assets.FaCircleDot className="text-2xl"/> :
                      <assets.FaCircleDot className={"text-xl"}/>
                      }
                    </div>
                    <div className={`w-[27%] h-[2px] ${Progress >= 1  ? `bg-[#b0adad]` :`bg-[#8c8b8b80]`} absolute left-[8%] top-[70%] z-0`}></div>
                    <div className={`w-[27%] h-[2px] ${Progress >= 2 ? `bg-[#b0adad]` :`bg-[#8c8b8b80]`} absolute left-[36.5%] top-[70%] z-0`}></div>
                    <div className={`w-[27%] h-[2px] ${Progress >= 3 ? `bg-[#b0adad]` :`bg-[#8c8b8b80]`} absolute left-[65%] top-[70%] z-0`}></div>

                  </div>
                </div>
                <div className="w-[90%] min-h-[90%] mt-[8%]">
                  <div className="w-[65%] h-full flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <h1 className={` text-2xl font-semibold`}>Details</h1>
                      <button className="px-3 py-1 rounded-2xl bg-[#3f3f3f]">Reuse details</button>
                    </div>
                    <div className={`${titleValid ? `border-white` : `border-red-400`}  w-full h-20 border-2 rounded-xl overflow-hidden relative`}>
                      <h4 className="flex items-center gap-2 text-sm px-3"><span className="font-medium">Title</span> <span className="text-xs">(Required)</span> <p className="w-4 h-4 border-[1px] flex justify-center items-center rounded-full text-xs">?</p></h4>
                      <input ref={inputRef} value={fileName} onChange={handleChange} className="w-full h-[80%] outline-0 absolute top-[50%] -translate-y-[50%] px-3" type="text" name="" id="" />
                        <span className={`${titleValid ? `text-[#8f8f8f]` : `text-red-400`} top-[70%] right-2 absolute  text-sm`}>{titleSize}/100</span>
                    </div>
                    <div className={`${descValid ? `border-white` : `border-red-400`}  w-full h-44 border-2 rounded-xl overflow-hidden relative`}>
                      <h4 className="flex items-center gap-2 text-sm px-3"><span className="font-medium">Description</span> <span className="text-xs">(Required)</span> <p className="w-4 h-4 border-[1px] flex justify-center items-center rounded-full text-xs">?</p></h4>
                      <textarea ref={DescinputRef} onChange={handleDescChange} className="w-full h-[85%] outline-0 resize-none absolute top-[54%] -translate-y-[50%] px-3" type="text" name="" id="" />
                        <span className={`${descValid ? `text-[#8f8f8f]` : `text-red-400`} top-[85%] right-2 absolute text-sm`}>{descSize}/5000</span>
                    </div>
                    <div className="">
                      <h1>Thumbnail</h1>
                      <input className="outline-2" type="file" name="" id="" />
                    </div>
                  </div>
                  <div className=""></div>
                </div>
                <div className="w-[65.5%] h-[7%] bottom-[5%] fixed border-t-[1px] border-[#8f8f8f] flex justify-between items-center">
                  <div className="ml-4">
                  icons
                  </div>
                  <div className="w-[15%] flex justify-evenly items-center">
                    <button className={`${step == "Details" ? `hidden` : `block`} px-3 py-1.5 bg-[#3f3f3f] text-white font-medium text-sm rounded-2xl cursor-pointer`}>Back</button>
                    <button className="px-3 py-1.5 bg-white text-black font-medium text-sm rounded-2xl cursor-pointer">Next</button>
                  </div>
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