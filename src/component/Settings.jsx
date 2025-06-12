import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleFill } from "react-icons/ri";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import { useState } from "react";

const Settings = ({ settingHandler, settingOpen }) => {
  const [isUser, setIsUser] = useState(false);

  if (auth.currentUser) {
    setIsUser((prev = !prev));
  }
  const logoutHandler = async () => {
    try {
      await auth.signOut();
      toast.success("Logout Successfully", {
        position: "top-center",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };
  return (
    <div className="relative">
      <button
        title="Settings"
        className="rounded-full p-2 transition duration-300 hover:rotate-45 hover:bg-[var(--color-background)]"
        onClick={settingHandler}
      >
        <IoSettingsOutline className="text-[20px] text-[var(--color-gray)] transition-colors duration-300 hover:text-[var(--color-secondary)] md:text-3xl" />
      </button>
      {settingOpen ? (
        <div className="animate-settingIcon absolute right-0 bottom-16 rounded-lg bg-[var(--color-light-gray)] px-2 py-3 text-[var(--color-primary)] shadow-lg">
          <ul className="flex flex-col items-center gap-3 text-2xl text-gray-400 md:text-2xl md:text-3xl">
            <li>
              {isUser ? (
                <button
                  className="rounded-full transition duration-300 hover:bg-[var(--color-surface)] hover:text-yellow-400"
                  title="Logout"
                  onClick={logoutHandler}
                >
                  <RiLogoutCircleFill />
                </button>
              ) : (
                ""
              )}
            </li>
            <li>
              <button
                className="rounded-full transition duration-300 hover:text-yellow-400"
                title="Inspire"
              >
                <RiLightbulbFlashFill />
              </button>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Settings;
