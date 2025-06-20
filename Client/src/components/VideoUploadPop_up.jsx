/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import {assets} from "../assets/assets.js"
import {useDropzone} from 'react-dropzone'
import { apiUrl } from "../utils/constants.jsx";
import PopUp_Message from "./PopUp_Message.jsx";
function VideoUploadPop_up({closePopUp}) {

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("Select Files");
  const [videoPath,setVideoPath]=useState()
  const [video , setVideo] = useState()
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
 //Description Input
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

 //Thumbnail Input
 const [thumbFilePath,setThumbnailFilePath]=useState('')
 const thumbRef = useRef(null)
 const HandleThumbnail = (event)=>{
   setThumbnailFilePath(event.target.files[0])
 }
 const handleNext =()=>{
  if(step == "Details"){
    HandleSteps("Video")
  }
  else if(step == "Video"){
    HandleSteps("Checks")
    handleChecks()
  }
  else if(step == "Checks"){
    HandleSteps("Visibility")
  }
 }
 const handleBack =()=>{
  if(step == "Video"){
    HandleSteps("Details")
  }
  else if(step == "Checks"){
    HandleSteps("Video")
  }
  else if(step == "Visibility"){
    HandleSteps("Checks")
  }
 }

  const [isUploading, setIsUploading] = useState(false);

  const handleVideoSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name)
      setVideo(event.target.files[0])
      setVideoPath(URL.createObjectURL(event.target.files[0]))
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
  
  const [alertVisible, setAlertVisible] = useState(false);
 
  const copyText = (text) => {
    navigator.clipboard.writeText(text)
      .then(() =>{ setAlertVisible(true)
      setTimeout(() => setAlertVisible(false), 1000)})
      .catch((err) => console.error("Failed to copy: ", err));
  };
// Loading
  const [loading,setLoading] = useState(false)
// Handle Upload 
const [uploaded, setUploaded] = useState(false)
const handleUpload = async () => {
  setLoading(true)
  const formData = new FormData();
  formData.append('videoFile', video);               
  formData.append('thumbnail', thumbFilePath);       
  formData.append('title', fileName);             
  formData.append('description', DescinputRef.current.value); 

  try {
    const response = await fetch(`${apiUrl}/videos/uploadVideo`, {
      method: "POST",
      credentials: "include",       
      body: formData                  
    });

    if (!response.ok) {
      throw new Error('Failed to upload');
    }

    const data = await response.json();
    if(data.status == 201){
      closePopUp()
      setUploaded(true)
      setLoading(false)
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);


  return (
    <>
     {/* Top header  */}
      <div className={`w-[65vw] xl:w-[62rem] h-[90vh] bg-[#282828] rounded-3xl flex flex-col ${isUploading ? `gap-7` : `gap-12`} overflow-hidden `}>
          <div className="h-[4rem]">
          <div className="h-[90%] border-b border-[#8f8f8f] flex justify-between items-center p-2 px-6 font-medium text-[1.1rem]">
            <h1 className="">{fileName == "Select Files" ? `Upload Video` : `${fileName}`}</h1>
            <div onClick={closePopUp} className="text-2xl cursor-pointer">
                <assets.RxCross2 />
            </div>
          </div>
          {/* Loading  */}
          {loading &&
              <div className="w-full h-1 bg-[#818080] relative">
                <div className="w-[80%] h-[100%] absolute  animate-infinite"></div>
              </div>
          }
          </div>
          {/* Main Part  */}
          {isUploading ?
              <div className="w-[65vw] xl:w-[62rem] flex h-[83%] flex-col items-center gap-y-6 overflow-y-scroll scrollbar-hide relative overflow-x-hidden">
                <div className="w-full h-[5.5rem]">
                  <div className="w-[65vw] xl:w-[62rem] h-[5.5rem] fixed bg-[#282828] z-20  flex items-center justify-center">
                    <div className="w-[55vw] xl:w-[55rem] h-full flex justify-between items-center relative">
                    <div onClick={()=>HandleSteps("Details")} className={`${titleValid ? `text-white` : `text-red-400`} h-full font-medium w-[20%] hover:bg-[#3f3f3fab] cursor-pointer flex flex-col items-center justify-center relative z-10`}>
                      <h1 className="absolute w-[7rem] text-center top-0.5">Details</h1>
                      {step == "Details" ? <assets.FaCircleDot className="text-2xl"/> :
                      <assets.IoIosCheckmarkCircle className="text-xl"/>
                      }
                    </div>
                      <div className={`w-[25%] h-[2px] ${Progress >= 1  ? `bg-[#b0adad]` :`bg-[#8c8b8b80]`} absolute left-[11%]`}></div>
                    <div onClick={()=>HandleSteps("Video")} className={`${Progress >= 1  ? `text-[#b0adad]` :`text-[#575656]`} font-medium w-[20%] h-full hover:bg-[#3f3f3fab] cursor-pointer flex flex-col items-center justify-center z-10 relative`}>
                      <h1 className="absolute w-[7rem] text-center top-0.5">Video Element</h1>
                      {step == "Video" ? <assets.FaCircleDot className="text-2xl mt-[1%]"/> :
                      <assets.FaCircleDot className="text-xl"/>
                      }
                    </div>
                      <div className={`w-[25%] h-[2px] ${Progress >= 2 ? `bg-[#b0adad]` :`bg-[#8c8b8b80]`}  absolute left-[37.5%]`}></div>
                    <div onClick={()=>handleChecks()} className={`${checks ? `text-[#b0adad]` :`text-[#575656]`}  font-medium w-[20%] h-full hover:bg-[#3f3f3fab] cursor-pointer flex flex-col items-center justify-center relative z-10`}>
                      <h1 className="absolute w-[7rem] text-center top-0.5">Checks</h1>
                      {checks ? <assets.IoIosCheckmarkCircle className="text-2xl"/> :
                      <assets.FaCircleDot className={`${step == "Checks" ?`text-2xl` : `text-xl`}`}/>
                      }
                    </div>
                      <div className={`w-[25%] h-[2px] ${Progress >= 3 ? `bg-[#b0adad]` :`bg-[#8c8b8b80]`}  absolute left-[64%]`}></div>
                    <div onClick={()=>HandleSteps("Visibility")} className={`${Progress >= 3  ? `text-[#b0adad]` :`text-[#575656]`} font-medium w-[20%] h-full hover:bg-[#3f3f3fab] cursor-pointer flex flex-col items-center justify-center relative z-10`}>
                      <h1 className="absolute w-[7rem] text-center top-0.5">Visibility</h1>
                      {step == "Visibility" ? <assets.FaCircleDot className="text-2xl"/> :
                      <assets.FaCircleDot className={"text-xl"}/>
                      }
                    </div>

                  </div>
                </div>
                </div>
                <div className="w-[90%] h-[80%] z-10 flex gap-4">
                  <div className="w-[65%] h-[100vh] flex flex-col gap-6">
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
                      <input className="outline-2" onChange={HandleThumbnail} ref={thumbRef} type="file" name="" id="" />
                    </div>
                  </div>
                  <div className="w-[33%] h-[18rem] bg-[#1f1f1f] mt-10 rounded-xl ">
                        <div className="w-full h-[18rem] ">
                          <div className="w-full h-[12rem]">
                            <video className="w-full h-full" src={videoPath} type="video/mp4" controls></video>
                          </div>
                          <div className="w-full h-[5.5rem]">
                            <div className="h-[50%] text-sm px-2 flex gap-2">
                              <div className="w-[85%]">
                                  <h4 className="text-xs text-[#8b8a8a]">Video Link</h4>
                                  <a href={videoPath} className="inline-block truncate w-full text-[#3da2f9]"> {videoPath}</a>
                              </div>
                              <div onClick={()=>copyText(videoPath)} className="w-[12%] flex justify-center items-center cursor-pointer">
                                <assets.MdContentCopy className="text-2xl"/>
                              </div>
                            </div>
                            <div className="h-[50%]  text-sm px-2">
                              <h4 className="text-xs text-[#8b8a8a]">Filename</h4>
                              <h4 className="truncate w-[80%]"> {fileName}</h4>
                            </div>

                          </div>
                        </div>
                  </div>
                </div>
                <div className="w-[65vw] xl:w-[62rem] h-[7%] bottom-[5%] px-2 fixed border-t-[1px] border-[#8f8f8f] bg-[#282828] flex justify-between items-center z-20 rounded-b-3xl">
                  <div className="ml-4">
                  icons
                  </div>
                  <div className="w-[10rem] flex items-center px-2">
                    <div className="w-[45%]">
                      <button onClick={()=>handleBack()} className={`${step == "Details" ? `hidden` : `block`} w-[4rem] float-left px-3 py-1.5 bg-[#3f3f3f] text-white font-medium text-sm rounded-2xl cursor-pointer`}>Back</button>
                    </div>
                    <div className="w-[45%]">
                      <button onClick={()=>handleNext()} className={`${step == "Visibility" ? `hidden` : `block`} w-[4rem] ml-3 px-3 py-1.5 bg-white text-black font-medium text-sm rounded-2xl cursor-pointer`}>Next</button>
                      <button onClick={()=>handleUpload()} className={`${step == "Visibility" ? `block` : `hidden`} w-[4.5rem] text-center ml-3 px-3 py-1.5 bg-white text-black font-medium text-sm rounded-2xl cursor-pointer`}>Upload</button>
                    </div>
                  </div>
                </div>
              </div>
           :
          //  Select Video -> first step 
            <form className="h-4/5 flex flex-col items-center justify-center gap-7">
              <div {...getRootProps()}
                className="w-[13rem] h-[13rem] flex justify-center items-center cursor-pointer rounded-full bg-[#2e2e2e]"
                onClick={handleVideoSelect}
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
                  onClick={handleVideoSelect}
                >
                  {fileName}
                </button>
              </div>
            </form> 
          }
      </div>   
      {/* Pop-Up Message  */}
      {alertVisible && (
        <PopUp_Message message={"✅ Text Copied!"} />
      )}
      {uploaded && (
         <PopUp_Message message={"✅ Video Upload Successfully!"} />
      )}
    </>
  )
}

export default VideoUploadPop_up