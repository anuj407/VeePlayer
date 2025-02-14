import { useSelector } from "react-redux"


function SuggestVideo() {
  const {videos} = useSelector((state) => state.videos)
  console.log(videos)
  return (
    <>
       <div className="w-[25%] flex flex-col gap-2">
        {videos.map((video,index) =>    
          <div key={index} className="cursor-pointer w-full border h-32 px-1 py-2 rounded-xl text-sm flex items-center gap-2">
            <div className="w-[40%] h-full ">
              <img className="w-full h-full rounded-md object-fill" src={video.thumbnail} alt="thumbnail"/>
            </div>
            <div>{video.title}</div>
          </div>
        )}
       </div>
    </>
  )
}

export default SuggestVideo