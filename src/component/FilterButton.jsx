import { BsFilterRight } from "react-icons/bs";

const FilterButton = ({ filterHandler, clickHandler, openFilter }) => {
  const filtersOptions = [
    "Most Liked",
    "Landscape",
    "Portrait",
    "Nature",
    "Other",
  ];

  return (
    <div className="relative">
      <button className="" title="filter" onClick={clickHandler}>
        <BsFilterRight className="text-[24px] md:text-3xl" />
      </button>
      {openFilter ? (
        <ul className="absolute right-0 z-50 mt-2 min-w-[64px] overflow-hidden rounded border bg-white shadow-lg">
          {filtersOptions.map((options) => {
            return (
              <button
                key={options}
                onClick={filterHandler}
                className="ease 2s w-full text-start transition-all hover:bg-gray-300"
              >
                {" "}
                <li className="cursor-pointer px-2 py-1 text-[14px] whitespace-nowrap">
                  {options}
                </li>
              </button>
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default FilterButton;
