import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { apiUrl } from "./constants";
import { setUserData } from "../store/Reducers/UserSlice";


const registerUrl = `${apiUrl}/users/register`;
const refreshTokenUrl = `${apiUrl}/users/me`;
const logoutUrl = `${apiUrl}/users/logout`;

const refreshToken =  async (dispatch) => {
    try {
        const response = await fetch(`${refreshTokenUrl}`, {
            method: "GET",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.status === 200) {
            dispatch(setUserData({
                username: data.username,
                fullName: data.fullName,
                email: data.email,
                avatar: data.avatar,
                refreshToken: data.refreshToken,
            }));
        }
    } catch (error) {
        console.error(error);
    }
 };

const googleSignIn = async (auth,dispatch) => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userData = {
            username: user.uid,
            fullName: user.displayName,
            email: user.email,
            avatar: user.photoURL,
        };

        const response = await fetch(`${registerUrl}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (response.status === 200) {
            window.location.href = "/profile";
            refreshToken(dispatch);
        }
    } catch (error) {
        console.error(error);
    }
 }

const googleSignOut = async(auth)=>{
    try{
      // Sign out from server
      await fetch(`${logoutUrl}`, {
        method: "POST",
        credentials: 'include',
      });
  
      // Sign out from Firebase
      await signOut(auth).then(()=>{
        window.location.href = "/";
      })

    }
    catch(error){
      console.error(error);
    }
 }

 export { refreshToken, googleSignIn, googleSignOut };