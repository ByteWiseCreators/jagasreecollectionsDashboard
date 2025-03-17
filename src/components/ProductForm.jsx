import classNames from "classnames";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useContext, useRef, useState } from "react";

import DropDown from "./DropDown";
import Button from "./Button";
import FileInput from "./FileInput";
import Input from "./Input";
import RenderFileArray from "./RenderFileArray";
import {
  deleteProductImg,
  editProduct,
  getProducts,
  postProduct,
  uploadeProductImg,
} from "../Utils/dbUtils";
import { DashboardContext } from "../context/DashboardContext";
import { BeatLoader } from "react-spinners";

import check from "../assets/check.svg";

export const ProductForm = ({ product, closePopup }) => {
  const { notify, setProducts } = useContext(DashboardContext);
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({
    id: product?.id,
    name: product?.name || "",
    code: product?.code || "",
    keywords: product?.keywords || "",
    description: product?.description || "",
    bulletPoints: product?.bulletPoints || "",
    category: product?.category || "Mens",
    type: product?.type || "Ethnic",
    size: product?.size || "",
    imgs: product?.imgs || [],
    isOutOfStock: product?.isOutOfStock || false,
  });
  const formRef = useRef(null);
  const categories = ["Mens", "Womens", "Kids"];
  const types = ["Ethnic", "Fashion", "Festive"];

  const handleInputChange = (key, value) => {
    setProductDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = async (files) => {
    const fileArray = Array.from(files);
    let formData = null;
    if (product) {
      formData = new FormData();
      fileArray.forEach((file) => {
        formData.append("imgs", file);
      });
    }
    setProductDetails((prev) => ({
      ...prev,
      imgs: [...prev.imgs, ...fileArray],
    }));

    await uploadeProductImg(product.id, formData);
  };

  const handleRemoveImage = async (index) => {
    setProductDetails((prev) => ({
      ...prev,
      imgs: prev.imgs.filter((_, i) => i !== index),
    }));

    await deleteProductImg(product.id, index);
  };

  const handleSubmit = async (e) => {
    console.log(productDetails);
    e.preventDefault();
    if (
      !productDetails.keywords ||
      !productDetails.name ||
      !productDetails.code ||
      !productDetails.description ||
      !productDetails.bulletPoints ||
      !productDetails.imgs
    )
      return;

    setIsLoading(true);

    if (!product) {
      const formData = new FormData();
      formData.append("name", productDetails.name);
      formData.append("code", productDetails.code);
      formData.append("keywords", productDetails.keywords);
      formData.append("bulletPoints", productDetails.bulletPoints);
      formData.append("description", productDetails.description);
      formData.append("category", productDetails.category);
      formData.append("type", productDetails.type);
      formData.append("size", productDetails.size);
      formData.append("isOutOfStock", productDetails.isOutOfStock);
      if (productDetails.imgs && Array.isArray(productDetails.imgs)) {
        productDetails.imgs.forEach((img) => {
          formData.append("imgs", img);
        });
      }

      const resMsg = await postProduct(formData);
      notify({ message: resMsg, type: "success" });
      const newAllProducts = await getProducts();
      setProducts(newAllProducts);
    } else {
      const resMsg = await editProduct(product.id, productDetails);
      setProducts((pv) =>
        pv.map((p) => (p.id === product.id ? { ...p, ...productDetails } : p))
      );
      notify({ message: resMsg, type: "success" });
    }

    setIsLoading(false);
    closePopup();

    setProductDetails({
      name: "",
      code: "",
      keywords: "",
      description: "",
      bulletPoints: "",
      category: "Mens",
      type: "Ethnic",
      size: "",
      imgs: [],
    });
  };

  const {
    name,
    code,
    description,
    category,
    type,
    keywords,
    bulletPoints,
    size,
    isOutOfStock
  } = productDetails;

  return (
    <>
      <motion.form
        ref={formRef}
        initial={{ y: 100, opacity: 0.3 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0.3 }}
        transition={{ type: "spring", damping: 40, stiffness: 400 }}
        className="fixed bottom-0 left-0 z-[100] overflow-x-hidden  px-10 bg-primary-50 mx-auto py-5 rounded-md shadow-lg cursor-auto w-screen h-[75vh]"
      >
        <h2 className="mb-6 text-2xl text-center font-heading text-primary-700">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <div className="flex flex-col gap-5 font-semibold md:flex-row font-body text-text">
          {/* Files */}
          <div className="space-y-8 basis-full md:basis-1/4">
            <FileInput
              text="Uplode image"
              handleFileChange={handleFileChange}
              fileArray={productDetails.imgs}
            />

            <RenderFileArray
              fileArray={productDetails.imgs}
              handleRemoveImage={handleRemoveImage}
            />
          </div>

          <hr className="h-auto border-[0.1px] border-gray-300" />
          {/* Other inputs */}
          <div className="basis-full md:basis-[37%]  flex flex-col gap-3.5">
            <Input
              value={name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              type="text"
              placeholder="Product Name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-primary-500 focus:border-primary-500"
            />

            <Input
              value={code}
              onChange={(e) => handleInputChange("code", e.target.value)}
              type="text"
              placeholder="Product Code"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-primary-500 focus:border-primary-500"
            />

            <Input
              value={keywords}
              onChange={(e) => handleInputChange("keywords", e.target.value)}
              type="text"
              placeholder="Search keywords   Eg: kurta, traditional kurta"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-primary-500 focus:border-primary-500"
            />

            <Input
              value={size}
              onChange={(e) => handleInputChange("size", e.target.value)}
              type="text"
              placeholder="Sizes available    Eg: sx, s, lg, xl"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-primary-500 focus:border-primary-500"
            />

            <div className="flex gap-2">
              <DropDown
                dropdownValues={categories}
                defaultValue={category}
                handleDropdownvalueChange={(value) =>
                  handleInputChange("category", value)
                }
                placeholder="Select Category"
                className="px-3 py-1"
              />
              <DropDown
                dropdownValues={types}
                defaultValue={type}
                handleDropdownvalueChange={(value) =>
                  handleInputChange("type", value)
                }
                placeholder="Select Type"
                className="px-3 py-1"
              />
            </div>

            <label
              onClick={() =>
                setProductDetails((prev) => ({
                  ...prev,
                  isOutOfStock: !prev.isOutOfStock,
                }))
              }
              className="inline-flex items-center gap-2.5 text-2xl w-fit font-heading text-text cursor-pointer"
            >
              <span
                className={classNames(
                  "border-2 border-gray-400 rounded-full size-4 relative",
                  isOutOfStock && "bg-primary-400"
                )}
              >
                {isOutOfStock ? (
                  <img src={check} alt="check" className="absolute inset-0 left-0.5 scale-[1.6]" />
                ) : null}
              </span>
              <span>Out of stock</span>
            </label>
          </div>

          <hr className="h-auto border-[0.1px] border-gray-300" />
          {/* Text areas */}
          <div className="basis-full md:basis-[37%] space-y-2">
            <textarea
              value={description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Description"
              rows="4"
              required
              className="w-full px-3 py-2 overflow-y-auto border border-gray-300 rounded-lg shadow-sm outline-none resize-none focus:ring-primary-500 focus:border-primary-500"
            ></textarea>

            <textarea
              value={bulletPoints}
              onChange={(e) =>
                handleInputChange("bulletPoints", e.target.value)
              }
              placeholder="Bullet points"
              rows="4"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm outline-none resize-none focus:ring-primary-500 focus:border-primary-500"
            ></textarea>

            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              className={classNames("theam-grad-1 px-5", isLoading && "py-2")}
            >
              {isLoading ? <BeatLoader color="#ffffff" /> : "Submit"}
            </Button>
          </div>
        </div>
      </motion.form>
    </>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object,
  closePopup: PropTypes.func,
};

export default ProductForm;
