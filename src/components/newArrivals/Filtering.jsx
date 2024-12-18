import { useContext, useState } from "react";
import { ProductContext } from "../../context";
import useGetCategory from "../../hooks/useGetCategory";

export default function Filtering() {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [checkedItem, setCheckedItem] = useState(null);
  const lists = useGetCategory("https://fakestoreapi.com/products/categories");
  const { handleFilterItems } = useContext(ProductContext);

  const handleshowFilterOption = () => {
    setIsShowFilter((prev) => !prev);
  };
  const handleCheckBox = (index, list) => {
    if (checkedItem === index) {
      setCheckedItem(null);
      handleFilterItems(null);
    } else {
      setCheckedItem(index);
      handleFilterItems(`/category/${list}`);
    }
    setIsShowFilter(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={handleshowFilterOption}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-400 hover:text-gray-500 focus:text-gray-700 transition-all"
          id="filter-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          Filter
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {/* <!-- Filter options --> */}
      <div
        className={`absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
          isShowFilter ? "block" : "hidden"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="filter-button"
        tabIndex="-1"
        id="filter-dropdown"
      >
        <div className="py-1" role="none">
          {lists.length > 0 &&
            lists.map((list, index) => (
              <label
                key={list}
                className="inline-flex w-full cursor-pointer hover:bg-gray-50 items-center px-4 py-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  onChange={() => handleCheckBox(index, list)}
                  className="form-checkbox h-4 w-4"
                  id="filter-option-1"
                  checked={checkedItem === index}
                />
                <span className="ml-2">{list}</span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );
}
