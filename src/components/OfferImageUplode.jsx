import PropTypes from "prop-types";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";
import { GoTrash } from "react-icons/go";

const OfferImageUplode = ({
  fileArray = [],
  handleFileChange = () => {},
  handleRemoveImage = () => {},
}) => {
  const fileInputRef = useRef(null);
  const imageContainerRef = useRef(null);

  const scrollLeft = () => {
    if (imageContainerRef.current)
      imageContainerRef.current.scrollBy({ left: -800, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (imageContainerRef.current)
      imageContainerRef.current.scrollBy({ left: 800, behavior: "smooth" });
  };

  return (
    <div className="flex items-center gap-6 min-h-56 popup">
      <div className="flex flex-col items-center">
        <div
          ref={imageContainerRef}
          className="relative flex w-full h-full gap-5 p-2 overflow-x-scroll"
        >
          <AnimatePresence>
            {fileArray.length > 0 &&
              fileArray.map((image, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0.5 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0.5 }}
                  transition={{ duration: 0.3, delay: i * 0.25 }}
                  className="relative overflow-hidden border rounded shadow-md shrink-0 group"
                >
                  <img
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image
                    }
                    alt={`img ${i + 1}`}
                    className="object-cover transition-all duration-500 max-h-48 md:max-h-56 hover:scale-105"
                  />
                  <GoTrash
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-0 right-0 hidden p-2 text-red-500 cursor-pointer bg-gradient-to-tr from-white/90 to-white/50 size-12 group-hover:block hover:scale-105 animate-opacity"
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        {fileArray.length > 2 && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded bg-primary-200 hover:bg-primary-300"
            >
              <FaAngleLeft className="size-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded bg-primary-200 hover:bg-primary-300"
            >
              <FaAngleRight className="size-5" />
            </button>
          </div>
        )}
      </div>
      <div className="flex">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files)}
          ref={fileInputRef}
          hidden
        />
        <div className="w-full flex flex-col gap-3 items-center mb-3.5">
          {fileArray.length < 4 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                fileInputRef?.current.click();
              }}
              className="relative group"
            >
              <RiImageAddLine className="text-gray-600 size-10" />
              <span className="absolute hidden -top-6 left-10 bg-text/70 text-neutral-50 text-sm z-10 min-w-[145px] py-2 text-center rounded-md animate-opacity group-hover:block">
                Add offer banners
              </span>
              {fileArray.length < 1 && (
                <span className="absolute -top-10 left-10 bg-text/70 leading-4 text-neutral-50 text-sm z-10 min-w-[145px] py-2 text-center rounded-md animate-opacity group-hover:hidden">
                  No current offers available. Add one?
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

OfferImageUplode.propTypes = {
  handleFileChange: PropTypes.func,
  handleRemoveImage: PropTypes.func,
  fileArray: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)])
  ),
};

export default OfferImageUplode;
