import Home from "./pages/Home"
import {Routes , Route} from "react-router-dom"
function App() {

  return (
    <div>
    {/* <Home/> */}
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/profile" element={<Home/>} />
    </Routes>
    </div>
  )
}

export default App