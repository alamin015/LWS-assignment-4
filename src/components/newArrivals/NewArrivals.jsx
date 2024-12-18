import { useContext, useState } from "react";
import { ProductContext } from "../../context";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound";
import ArrivalsTop from "./ArrivalsTop";
import Card from "./Card";
import Cart from "./Cart";
import Filtering from "./Filtering";
import Sorting from "./Sorting";

export default function NewArrivals() {
  const [lowToHigh, setLowToHigh] = useState(true);
  const { filteredProducts, loading, searchText, setSearchText } =
    useContext(ProductContext);

  let updatedItem = filteredProducts.sort((a, b) => {
    if (lowToHigh) {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <div>
      <div className="pt-16 sm:pt-24 lg:pt-40">
        <ArrivalsTop />
        <div className="mt-10">
          <div className="flex justify-between relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            {/* <!-- Sort & Filter--> */}
            <div className="w-full">
              <Sorting setLowToHigh={setLowToHigh} />
              <Filtering />
            </div>

            {/* <!-- Search and Cart --> */}
            <div className="flex gap-2 items-center">
              {/* <!-- Search --> */}
              <div className="flex flex-1 items-center px-3.5 py-2 text-gray-400 group hover:ring-1 hover:ring-gray-300 focus-within:!ring-2 ring-inset focus-within:!ring-teal-500 rounded-md">
                <svg
                  className="mr-2 h-5 w-5 stroke-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="block w-full appearance-none bg-transparent text-base text-gray-700 placeholder:text-gray-400 focus:outline-none placeholder:text-sm sm:text-sm sm:leading-6"
                  placeholder="Find anything..."
                  aria-label="Search components"
                  id="headlessui-combobox-input-:r5n:"
                  role="combobox"
                  type="text"
                  aria-expanded="false"
                  aria-autocomplete="list"
                  style={{ caretColor: "rgb(107, 114, 128)" }}
                />
              </div>

              {/* <!-- Cart --> */}
              <Cart />
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div
                className={`mt-6 grid grid-cols-1 gap-x-6 gap-y-10 ${
                  updatedItem.length > 0 ? "sm:grid-cols-2 lg:grid-cols-4" : ""
                } xl:gap-x-8`}
              >
                {/* <!-- Card --> */}
                {loading ? (
                  <Loader />
                ) : updatedItem.length > 0 ? (
                  updatedItem.map((list) => <Card key={list.id} list={list} />)
                ) : (
                  <NotFound />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
