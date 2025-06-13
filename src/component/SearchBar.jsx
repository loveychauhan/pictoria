import { IoIosSearch } from "react-icons/io";
const SearchBar = ({ inputHandler, isDark }) => {
  return (
    <div
      className="bg-light-gray text-gray my-2 flex flex-1 items-center rounded-[10px] px-2 py-1 md:my-1 md:py-2"
      style={{ backgroundColor: isDark ? "#71717a" : "#e0e0e0" }}
    >
      <IoIosSearch className="text-gray text-xl" />
      <input
        type="text"
        placeholder="Search"
        className="placeholder-gray ml-2 flex-1 outline-0 md:text-xl"
        onChange={inputHandler}
      />
    </div>
  );
};

export default SearchBar;
