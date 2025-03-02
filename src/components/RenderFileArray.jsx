/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types";
import { memo } from "react";
import { MdOutlineCancel } from "react-icons/md";

const RenderFileArray = ({ fileArray = [], handleRemoveImage = () => {} }) => (
  <>
    {fileArray.length > 0 && (
      <div className="grid grid-cols-2 gap-2">
        {fileArray.map((image, i) => (
          <div key={i} className="relative">
            <img
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt={`img ${i + 1}`}
              className="w-full h-auto max-h-24 object-contain rounded-md"
            />
            <MdOutlineCancel
              type="button"
              onClick={() => handleRemoveImage(i)}
              className="absolute top-0 right-0 text-red-500 bg-transparent cursor-pointer size-5"
            />
          </div>
        ))}
      </div>
    )}
  </>
);

RenderFileArray.propTypes = {
  fileArray: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
};

export default memo(RenderFileArray);
