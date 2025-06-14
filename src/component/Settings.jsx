import { IoSettingsOutline } from "react-icons/io5";
import { RiLightbulbFlashFill } from "react-icons/ri";

const Settings = ({ settingHandler, settingOpen, darkModeHandler, isDark }) => {
  return (
    <div className="relative">
      <button
        title="Settings"
        className="rounded-full p-2 transition duration-300 hover:rotate-45"
        style={{ color: isDark ? "#e0e0e0" : "#1c1c1e" }}
        onClick={settingHandler}
      >
        <IoSettingsOutline className="text-[20px] transition-colors duration-300 hover:text-[var(--color-secondary)] md:text-3xl" />
      </button>
      {settingOpen ? (
        <div
          className="animate-settingIcon absolute right-0 bottom-16 rounded-lg bg-[var(--color-light-gray)] px-2 py-3 text-[var(--color-primary)] shadow-lg"
          style={{ backgroundColor: isDark ? "#94a3b8" : "#e0e0e0" }}
        >
          <ul className="flex flex-col items-center gap-3 text-2xl text-gray-400 md:text-2xl md:text-3xl">
            <li>
              <button
                className="rounded-full transition duration-300"
                style={{ color: isDark ? "#f5de0b" : "#1c1c1e" }}
                title="Inspire"
                onClick={darkModeHandler}
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
