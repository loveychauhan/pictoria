import FavoriteButton from "./FavoriteButton";
import Settings from "./Settings";

const Footer = ({
  favCollection,
  settingHandler,
  settingOpen,
  darkModeHandler,
  isDark,
}) => {
  return (
    <footer
      className="fixed bottom-0 flex w-full items-center justify-between rounded-tl-[10px] rounded-tr-[10px] bg-[var(--color-light-gray)] px-4 py-0.5 shadow-2xl md:hidden"
      style={{ backgroundColor: isDark ? "#2c2c2e" : "#e0e0e0" }}
    >
      <FavoriteButton favCollection={favCollection} />
      <Settings
        settingHandler={settingHandler}
        settingOpen={settingOpen}
        darkModeHandler={darkModeHandler}
        isDark={isDark}
      />
    </footer>
  );
};

export default Footer;
