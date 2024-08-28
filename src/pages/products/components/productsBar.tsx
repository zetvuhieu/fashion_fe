import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import {
  fetchCategories,
  selectCategoriesData,
} from "@/redux/features/products/category";
import { AppDispatch } from "@/redux/store"; // Import AppDispatch if necessary

interface Category {
  _id: string;
  name: string;
}

interface CategoryFilterProps {
  onChange?: (categoriesId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategoriesData);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleCategoryClick = (category: Category) => {
    if (onChange) {
      onChange(category._id);
    }
    toggleFilterVisibility();
    window.scroll(0, 0);
  };

  const centerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100px",
  };

  return (
    <>
      {/* Mobile Filter Icon */}
      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 lg:hidden">
        <button
          onClick={toggleFilterVisibility}
          className="p-2 bg-white shadow rounded"
        >
          <FaFilter className="text-2xl text-green-600" />
        </button>
      </div>
      {/* Filter Modal */}
      <div
        className={`fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 transition-transform duration-300 ${
          isFilterVisible ? "translate-x-0" : "translate-x-full"
        } lg:static lg:translate-x-0 lg:bg-transparent lg:flex-col lg:p-4`}
      >
        <div className="bg-white shadow-lg rounded p-4 w-full max-w-md lg:max-w-full lg:w-auto lg:bg-transparent lg:shadow-none lg:rounded-none lg:p-0">
          <IoMdClose
            onClick={toggleFilterVisibility}
            className="cursor-pointer lg:hidden"
          />
          <h2 className="bg-[#46694f] px-12 py-2 text-white rounded-xl font-semibold lg:text-lg ">
            Danh mục sản phẩm
          </h2>
          {categories === null ? (
            <div style={centerStyle}>
              <div className="w-full space-y-2">
                <Skeleton height={35} />
                <Skeleton height={35} />
                <Skeleton height={35} />
                <Skeleton height={35} />
              </div>
            </div>
          ) : (
            <ul className="lg:flex lg:flex-col lg:ml-1 lg:mt-2">
              {categories.map((category) => (
                <li key={category._id.$oid}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="block p-2 lg:p-0 lg:mb-2 lg:text-neutral-700 text-lg font-medium"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

CategoryFilter.propTypes = {
  onChange: PropTypes.func,
};

export default CategoryFilter;
