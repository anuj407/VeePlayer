import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    username: null,
    fullName:null,
    email: null,
    avatar: null,
    refreshToken: null,
    isTokenValid: false,
}
const UserSclice = createSlice({
    name:"user",
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
})
export const { setUserData, clearUserData } = UserSclice.actions;

export const selectUser = (state) => state.user;
export default UserSclice.reducer;