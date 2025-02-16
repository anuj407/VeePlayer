import { createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { apiUrl } from "../../utils/constants";
const initialState = {
    username: null,
    fullName: null,
    email: null,
    avatar: null,
    refreshToken: null,
    isTokenValid: false,
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.username = action.payload.username;
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.refreshToken = action.payload.refreshToken;
            state.isTokenValid = !!action.payload.refreshToken;
        },
        clearUserData: (state) => {
            state.username = null;
            state.fullName = null;
            state.email = null;
            state.avatar = null;
            state.refreshToken = null;
            state.isTokenValid = false;
        },
    },
});

export const { setUserData, clearUserData } = UserSlice.actions;
export const selectUser = (state) => state.user;
export default UserSlice.reducer;

// Async functions for authentication
const refreshTokenUrl = `${apiUrl}/users/me`;
export const refreshToken = () => async () => {
    try {
        const response = await fetch(`${refreshTokenUrl}`, {
            method: "GET",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.status === 200) {
            setUserData({
                username: data.username,
                fullName: data.fullName,
                email: data.email,
                avatar: data.avatar,
                refreshToken: data.refreshToken,
            });
        }
    } catch (error) {
        console.error(error);
    }
};
const registerUrl = `${apiUrl}/users/register`;
export const googleSignIn = (auth) => async () => {
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
            refreshToken();
            window.location.href = "/profile";
        }
    } catch (error) {
        console.error(error);
    }
};