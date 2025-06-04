import Home from "./pages/Home"
import {Routes , Route} from "react-router-dom"
import Watch from "./pages/Watch"
import Channel from "./pages/Channel"
import LikedVideos from "./pages/LikedVideos"
function App() {

  return (
    <div>
    {/* <Home/> */}
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/watch/:videoId" element={<Watch/>} />
      <Route path="/profile/:username" element={<Channel/>} />
      <Route path="/liked-videos" element={<LikedVideos/>} />
    </Routes>
    </div>
  )
}

export default App