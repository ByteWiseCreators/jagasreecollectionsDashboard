import { useEffect, useState, useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

import ProductForm from "../components/ProductForm.jsx";
import ProductCard from "../components/ProductCard.jsx";
import DropDown from "../components/DropDown";

import usePopupBackDrop from "../hooks/usePopupBackDrop";

import { IoIosAdd } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";

const Invantory = () => {
  const { products } = useContext(DashboardContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const catogries = ["All Products", "Mens", "Womens", "Kids"];
  const [selectedValue, setSelectedValue] = useState(catogries[0]);
  const handleCatogryChange = (value) => setSelectedValue(value);

  const { BackDrop, openPopup, closePopup } = usePopupBackDrop(false, true);

  useEffect(() => {
    const categoryFiltered =
      selectedValue === "All Products"
        ? products
        : products.filter((product) => product.category === selectedValue);

    const searchFiltered = categoryFiltered.filter((product) => {
      const searchFields = ["name", "code", "type", "keywords"];
      return searchFields.some((key) =>
        product[key]?.toLowerCase().includes(searchValue.toLowerCase())
      );
    });

    setFilteredProducts(searchFiltered);
  }, [selectedValue,searchValue, products]);

  return (
    <section className="overflow-x-hidden py-5 relative">
      <div className="flex flex-col items-center sm:flex-row gap-x-16 gap-y-5 mb-6">
        <h2 className="font-heading text-3xl font-semibold text-text">
          Manage Products
        </h2>
        <DropDown
          dropdownValues={catogries}
          handleDropdownvalueChange={handleCatogryChange}
          w="w-44"
        />
        <div className="relative border rounded-md group focus-within:border-primary-600">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="unset font-heading text-xl py-1 px-3 pr-10"
            placeholder="Search here..."
          />
          <BiSearchAlt className="absolute top-0.5 right-1 rounded-full p-1 text-neutral-200 group-focus-within:text-primary-600 size-7 sm:size-8" />
        </div>
      </div>

      <div className="font-heading">{selectedValue}</div>
      <div className="flex gap-5 flex-wrap mt-2">
        {filteredProducts.map((item, i) => (
          <ProductCard
            key={`${item.code}-${i}`}
            name={item.name}
            description={item.description}
            imgs={item.imgs}
            productDetials={item}
          />
        ))}
      </div>
      <BackDrop>
        <ProductForm closePopup={closePopup}/>
      </BackDrop>
      <div
        onClick={openPopup}
        className="fixed bottom-7 right-8 aspect-square text-4xl bg-primary-500 rounded-full transition-all duration-150 hover:scale-105 active:scale-95 hover-elavate"
      >
        <IoIosAdd className="size-[74px] text-neutral-200 cursor-pointer" />
      </div>
    </section>
  );
};

export default Invantory;