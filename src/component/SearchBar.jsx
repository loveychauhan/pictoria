import { IoIosSearch } from "react-icons/io";
const Searchbar = ({ inputHandler }) => {
  return (
    <div className="bg-light-gray text-gray my-2 flex flex-1 items-center rounded-[10px] px-2 py-1 shadow-2xl md:my-1 md:py-2">
      <IoIosSearch className="text-gray text-xl" />
      <input
        type="text"
        placeholder="Search"
        className="text-gray placeholder-gray ml-2 flex-1 outline-0 md:text-xl"
        onChange={inputHandler}
      />
    </div>
  );
};

export default Searchbar;
