import Navbar from "../components/Navbar"
import SuggestVideo from "../components/SuggestVideo"
import VideoWatch from "../components/VideoWatch"

function Watch() {
  return (
    <>
        <Navbar/>
    <div className="mt-20 flex justify-evenly">
        <VideoWatch/>
        <SuggestVideo/>
    </div>
    </>
  )
}

export default Watch