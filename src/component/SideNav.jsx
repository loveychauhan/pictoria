import { Link } from "react-router-dom";
import { RiCollageFill } from "react-icons/ri";
import UploadAndLoginButtons from "./UploadAndLoginButtons";
import FavoriteButton from "./FavoriteButton";
import Settings from "./Settings";

const SideNav = ({
  favCollection,
  uploadHandler,
  settingHandler,
  settingOpen,
  darkModeHandler,
  isDark,
}) => {
  return (
    <aside
      className="hidden h-full w-[80px] flex-col items-center justify-between rounded-r-xl py-6 shadow-md md:flex xl:w-[120px]"
      style={{ backgroundColor: isDark ? "#2c2c2e" : "#e0e0e0" }}
    >
      <div className="flex flex-col items-center gap-6">
        <Link to="/" title="Home" onClick={() => window.location.reload()}>
          <RiCollageFill className="text-4xl text-gray-500 transition duration-200 hover:text-[var(--color-primary)] xl:text-5xl" />
        </Link>

        <UploadAndLoginButtons uploadHandler={uploadHandler} />
        <FavoriteButton favCollection={favCollection} />
      </div>

      <Settings
        settingHandler={settingHandler}
        settingOpen={settingOpen}
        darkModeHandler={darkModeHandler}
        isDark={isDark}
      />
    </aside>
  );
};

export default SideNav;
