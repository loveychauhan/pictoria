import { IoSettingsOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { auth } from "../firebase/firebase";

const Footer = () => {
  const user = auth.currentUser
  const favouriteHandler = () => {
    
  };
  return (
    <footer className="fixed bottom-0 mt-1 flex w-full items-center justify-between rounded-tl-[10px] rounded-tr-[10px] bg-gray-200 px-2 py-1">
      <button title="Favorites" onClick={favouriteHandler}>
        <MdFavorite className="text-favorites 2s text-[20px] transition-all ease-in-out hover:text-pink-500" />
      </button>
      <button
        className="ease 6s transition-all hover:rotate-45"
        title="Settings"
      >
        <IoSettingsOutline className="text-[20px]" />{" "}
      </button>
    </footer>
  );
};

export default Footer;
