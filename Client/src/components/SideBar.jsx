/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../store/Reducers/UserSlice";
import { fetchProfile } from "../store/Reducers/ChannelSlice";
import { getLikedVideos } from "../store/Reducers/LikedVideos";
import PopUp_Message from "./PopUp_Message";

import {
  Home,
  History,
  Video,
  TvMinimalPlay ,
  User,
  Heart,
  Download,
  ChevronRight,
} from "lucide-react";

function SideBar({ fullSideBar }) {
  const [selectOptions, setSelectOptions] = useState("Home");
  const { username, _id } = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signInMsg, setSignInMsg] = useState("");

  const showMessage = (msg) => {
    setSignInMsg(msg);
    setTimeout(() => setSignInMsg(""), 2000);
  };

  const handleHome = () => {
    setSelectOptions("Home");
    navigate("/");
  };

  const handleYou = () => {
    setSelectOptions("You");
    if (username) {
      dispatch(fetchProfile({ username, userId: _id }));
      navigate(`/profile/${username}`);
    } else {
      showMessage("Please login to access your profile");
    }
  };

  const handleLikedVideos = () => {
    setSelectOptions("Liked");
    if (username) {
      dispatch(getLikedVideos());
      navigate("/liked-videos");
    } else {
      showMessage("Please login to access your liked videos");
    }
  };

  useEffect(() => {
    if (window.location.href.includes("/profile")) {
      setSelectOptions("You");
    }
  }, []);

  // Professional theme colors
  const activeBg = "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50";
  const inactiveText = "text-gray-400 hover:bg-blue-50 hover:text-blue-700";
  const hoverBg = "hover:bg-blue-100";

  const isActive = (key) =>
    selectOptions === key ? activeBg : `${inactiveText} ${hoverBg}`;

  const sidebarItem = (label, icon, onClick, key) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400
        ${isActive(key)} 
        ${fullSideBar ? "w-full justify-start" : "w-[56px] justify-center"}
      `}
      aria-current={selectOptions === key ? "page" : undefined}
    >
      {icon}
      {fullSideBar && <span className="font-semibold text-sm select-none">{label}</span>}
    </button>
  );

  return (
    <>
      <aside
        className={`fixed top-[136px] left-0 h-[calc(100vh-128px)] bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200
          border-r border-gray-200 dark:border-gray-700 z-40
          ${fullSideBar ? "w-[14rem]" : "w-[5rem]"}
          px-3 py-6 
          shadow-xl
          `}
      >
        {/* Main Items */}
        {sidebarItem("Home", <Home size={22} />, handleHome, "Home")}
        {sidebarItem(
          "Subscriptions",
          <Video size={22} className="" />,
          () => setSelectOptions("Subscriptions"),
          "Subscriptions"
        )}

        {/* Divider */}
        <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4 space-y-3">
          <div
            className={`flex items-center gap-2 px-1 ${
              fullSideBar ? "justify-start" : "justify-center"
            } text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider select-none`}
          >
            You <ChevronRight size={18} />
          </div>

          {sidebarItem("History", <History size={22} />, () => setSelectOptions("History"), "History")}
          {sidebarItem("Playlists", <TvMinimalPlay  size={22} />, () => setSelectOptions("Playlists"), "Playlists")}
          {sidebarItem("Your videos", <Video size={22} />, () => setSelectOptions("videos"), "videos")}
          {sidebarItem("Watch Later", <History size={22} />, () => setSelectOptions("Watch"), "Watch")}
          {sidebarItem("Liked videos", <Heart size={22} />, handleLikedVideos, "Liked")}
          {sidebarItem("Downloads", <Download size={22} />, () => setSelectOptions("Downloads"), "Downloads")}
        </div>

        {/* Profile */}
        <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
          {sidebarItem("You", <User size={22} />, handleYou, "You")}
        </div>
      </aside>

      {/* Sign-in popup */}
      {signInMsg && (
        <PopUp_Message
          message={
            <p className="flex items-center gap-2 text-sm">
              <span className="text-lg">⚠️</span> {signInMsg}
            </p>
          }
          color="warning"
        />
      )}
    </>
  );
}

export default SideBar;
