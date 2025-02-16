/* eslint-disable react/prop-types */
import { auth } from "./Firebase"
import { useDispatch } from "react-redux"
import { googleSignIn } from "../store/Reducers/UserSlice"

function SignIn_Message({title,title1}) {
  const dispatch = useDispatch()
  const handleSignIn = (event) => {
    event.stopPropagation()
    console.log("Hi")
    dispatch(googleSignIn(auth))
  }
  return (
    <>
       <div className="w-full h-full p-3 bg-black text-white flex flex-col justify-between">
        <p className="text-sm pt-1">{title1 || " "} </p>
        <p className="text-sm">{title}</p>
        <button onClick={handleSignIn} className="text-blue-500 w-fit px-1 py-1 cursor-pointer">Sign In</button>
       </div>
    </>
  )
}

export default SignIn_Message