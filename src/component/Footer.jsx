import FavoriteButton from "./FavoriteButton";
import Settings from "./Settings";

const Footer = ({ favCollection, settingHandler, settingOpen }) => {
  return (
    <footer className="fixed bottom-0 mt-1 flex w-full items-center justify-between rounded-tl-[10px] rounded-tr-[10px] bg-[var(--color-light-gray)] px-2 py-1 shadow-2xl md:hidden">
      <FavoriteButton favCollection={favCollection} />
      <Settings settingHandler={settingHandler} settingOpen={settingOpen} />
    </footer>
  );
};

export default Footer;
