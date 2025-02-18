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
      <Route path="/profile" element={<Home/>} />
      <Route path="/watch/:videoId" element={<Watch/>} />
      <Route path="/channel/:username" element={<Channel/>} />
    </Routes>
    </div>
  )
}

export default App