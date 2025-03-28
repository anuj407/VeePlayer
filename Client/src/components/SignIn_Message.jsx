/* eslint-disable react/prop-types */
import { auth } from "./Firebase"
import { googleSignIn } from "../utils/handleUser"

function SignIn_Message({title,title1}) {

  const handleSignIn = (event) => {
    event.stopPropagation()
    googleSignIn(auth)
  }
  return (
    <>
       <div className="w-full h-full bg-black py-3 text-white flex flex-col justify-between">
          <p className="text-sm pt-1 h-[33%] px-3">{title1 || " "} </p>
          <p className="text-sm h-[33%] px-3">{title}</p>
          <button onClick={handleSignIn} className="text-blue-500 w-full h-[33%] px-2 py-1 cursor-pointer text-start hover:bg-[#222222]">Sign In</button>
       </div>
    </>
  )
}

export default SignIn_Message