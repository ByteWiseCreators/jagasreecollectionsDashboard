import PropTypes from "prop-types";
import { useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

const FileInput = ({
  text = "Uplode file",
  handleFileChange = () => {},
  fileArray = [],
  fileType = "image",
}) => {
  const fileInputRef = useRef(null);

  const fileAccept = fileType === "image" ? "image/*" : ".md";
  const fileLabel = fileType === "image" ? "images chosen" : "";

  return (
    <div>
      <input
        type="file"
        accept={fileAccept}
        multiple={fileType === "image"}
        onChange={(e) => handleFileChange(e.target.files)}
        ref={fileInputRef}
        hidden
      />

      <div className="w-full flex gap-3 items-center mb-3.5">
        <button
          onClick={(e) => {
            e.preventDefault();
            fileInputRef?.current.click();
          }}
          className="py-1 text-text/70 font-heading font-medium flex gap-1 items-center px-3 max-w-fit border text-sm bg-white border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
        >
          <MdOutlineFileUpload className="size-4" />
          {text}
        </button>
        <div>
          <span className="text-sm text-gray-500">
            {fileArray.length > 1
              ? fileArray.at(-1) instanceof File &&
                `${fileArray.length} ${fileLabel}`
              : fileArray[0]?.name}
          </span>
        </div>
      </div>
    </div>
  );
};

FileInput.propTypes = {
  text: PropTypes.string,
  handleFileChange: PropTypes.func,
  fileArray: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)])
  ),
  fileType: PropTypes.oneOf(["image", "markdown"]),
};

export default FileInput;