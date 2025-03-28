import Home from "./pages/Home"
import {Routes , Route} from "react-router-dom"
import Watch from "./pages/Watch"
import Channel from "./pages/Channel"
function App() {

  return (
    <div>
    {/* <Home/> */}
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/watch/:videoId" element={<Watch/>} />
      <Route path="/profile/:username" element={<Channel/>} />
    </Routes>
    </div>
  )
}

export default App