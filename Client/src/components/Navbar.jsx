import { assets } from "../assets/assets";
import { auth } from "./Firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/Reducers/UserSlice";
import { googleSignIn, googleSignOut, refreshToken } from "../utils/handleUser";
import { useNavigate } from "react-router-dom";
import VideoUploadPop_up from "./VideoUploadPop_up";

function Navbar() {
  const { avatar, fullName, username } = useSelector(selectUser);
  const [handleSignIn, handleSignOut, isTokenValid] = HandleNavbar();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [createPopUp, setCreatePopUp] = useState(false);
  const [uploadPopUp, setUploadPopUp] = useState(false);

  const handleProfile = () => {
    setShowMenu((prev) => !prev);
    setCreatePopUp(false);
  };

  const handleUploadPopUp = () => {
    setUploadPopUp(false);
  };

  const handleCreateButton = () => {
    setCreatePopUp((prev) => !prev);
    setShowMenu(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 bg-white dark:bg-slate-800 flex items-center justify-between px-6 shadow-md z-40 transition-colors duration-300">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img
            className="w-16 h-auto"
            src={assets.logo}
            alt="VeePlayer Logo"
            loading="lazy"
          />
          <h1 className="text-slate-900 dark:text-white text-2xl font-extrabold select-none tracking-wide">
            VeePlayer
          </h1>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center w-1/3 border border-slate-300 dark:border-slate-700 rounded-full overflow-hidden shadow-sm shadow-black focus-within:border-slate-400 dark:focus-within:border-slate-500 transition duration-300">
          <input
            className="flex-grow px-4 py-2 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
            type="search"
            placeholder="Search videos..."
            aria-label="Search videos"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
            aria-label="Search"
          >
            <assets.FiSearch className="text-slate-900 dark:text-white w-5 h-5" />
          </button>
        </div>

        {/* Auth Buttons and Profile */}
        {!isTokenValid ? (
          <button
            onClick={() => handleSignIn()}
            className="flex items-center gap-2 border-2 border-slate-300 dark:border-slate-700 rounded-full px-5 py-2 text-slate-900 dark:text-white font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
            aria-label="Sign in"
          >
            <assets.IoPersonCircleOutline className="w-6 h-6" />
            <span>Sign In</span>
          </button>
        ) : (
          <div className="flex items-center gap-6">
            <button
              onClick={handleCreateButton}
              className="flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 px-5 py-2 text-slate-900 dark:text-white font-semibold transition-colors duration-300"
              aria-label="Create content"
            >
              <assets.BsPlusLg className="w-5 h-5" />
              <span>Create</span>
            </button>

            <button
              aria-label="Notifications"
              className="text-slate-900 dark:text-white hover:text-slate-500 dark:hover:text-slate-400 transition duration-200 text-2xl"
            >
              <assets.IoNotificationsSharp />
            </button>

            <button
              onClick={handleProfile}
              aria-haspopup="true"
              aria-expanded={showMenu}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-slate-400 dark:hover:border-slate-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500"
            >
              <img
                src={avatar}
                alt={`${fullName} avatar`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          </div>
        )}
      </nav>

      {/* Create Pop-Up */}
      {createPopUp && (
        <div className="fixed top-20 right-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg shadow-black z-50 w-48 py-2 select-none transition-colors duration-300">
          <button
            onClick={() => setUploadPopUp(true)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-200 dark:hover:bg-slate-700 w-full text-left transition duration-200 text-slate-900 dark:text-white"
            aria-label="Upload video"
          >
            <assets.GoVideo className="w-5 h-5" />
            Upload Video
          </button>
          <button
            onClick={() => alert("Create Post clicked")} // Replace with your logic
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-200 dark:hover:bg-slate-700 w-full text-left transition duration-200 text-slate-900 dark:text-white"
            aria-label="Create post"
          >
            <assets.TfiWrite className="w-5 h-5" />
            Create Post
          </button>
        </div>
      )}

      {/* Profile Menu */}
      {showMenu && (
        <aside
          className="fixed top-20 right-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg shadow-black z-50 w-56 py-4 select-none transition-colors duration-300"
          role="menu"
          aria-label="User profile menu"
        >
          <div className="flex items-center gap-3 px-4 mb-4">
            <img
              src={avatar}
              alt={`${fullName} avatar`}
              className="w-12 h-12 rounded-full object-cover"
              loading="lazy"
            />
            <div className="text-slate-900 dark:text-white">
              <h3 className="font-semibold text-lg">{fullName}</h3>
              <p className="text-slate-400 dark:text-slate-500">@{username}</p>
            </div>
          </div>

          <button
            onClick={() => navigate(`/channel/${username}`)}
            className="block w-full text-center py-2 text-slate-900 dark:text-white font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
            role="menuitem"
          >
            View your channel
          </button>

          <hr className="border-slate-300 dark:border-slate-700 my-2" />

          <button
            onClick={() => handleSignOut()}
            className="flex items-center gap-3 w-full px-4 py-2 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
            role="menuitem"
          >
            <assets.PiSignInBold className="w-5 h-5" />
            Sign out
          </button>

          <button
            onClick={() => alert("Settings clicked")} // Replace with your settings logic
            className="flex items-center gap-3 w-full px-4 py-2 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
            role="menuitem"
          >
            <assets.IoSettingsOutline className="w-5 h-5" />
            Settings
          </button>
        </aside>
      )}

      {/* Upload Pop-Up */}
      {uploadPopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <VideoUploadPop_up closePopUp={handleUploadPopUp} />
        </div>
      )}
    </>
  );
}

export default Navbar;

const HandleNavbar = () => {
  const dispatch = useDispatch();
  const { isTokenValid } = useSelector(selectUser);

  const handleSignIn = () => {
    googleSignIn(auth, dispatch);
  };
  const handleSignOut = () => {
    googleSignOut(auth);
  };

  useEffect(() => {
    if (window.location.href !== "http://localhost:5173/") {
      refreshToken(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [handleSignIn, handleSignOut, isTokenValid];
};
