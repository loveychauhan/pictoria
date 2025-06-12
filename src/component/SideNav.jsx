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
}) => {
  return (
    <aside className="hidden h-full w-full max-w-[80px] flex-col items-center justify-between rounded-r-xl bg-[var(--color-light-gray)] py-6 shadow-md md:flex">
      <div className="flex flex-col items-center gap-6">
        <Link to="/" title="Home">
          <RiCollageFill className="text-4xl text-gray-500 transition duration-200 hover:text-[var(--color-primary)]" />
        </Link>

        <UploadAndLoginButtons uploadHandler={uploadHandler} />
        <FavoriteButton favCollection={favCollection} />
      </div>

      <Settings settingHandler={settingHandler} settingOpen={settingOpen} />
    </aside>
  );
};

export default SideNav;
