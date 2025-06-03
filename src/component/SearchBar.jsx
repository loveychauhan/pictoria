import { IoIosSearch } from "react-icons/io";
const Searchbar = () => {
  return (
    <div className="bg-background text-gray my-2 flex items-center rounded-[10px] px-2 py-1">
      <IoIosSearch className="text-gray text-xl" />
      <input
        type="text"
        placeholder="Search"
        className="text-gray placeholder-gray ml-2 flex-1 outline-0 md:text-xl"
      />
    </div>
  );
};

export default Searchbar;
