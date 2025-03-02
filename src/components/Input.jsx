/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types";
import { useRef, useState, memo } from "react";

const Input = ({ value, placeholder, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const isActive = isFocused || value?.length > 0;
  const activePlaceholder = placeholder.split("Eg:")[0].trim();

  return (
    <div className="relative w-full">
      <label
        onClick={() => inputRef?.current.focus()}
        className={`absolute left-2 transform -translate-y-1/2 text-gray-400 bg-primary-50 px-1 transition-all duration-150 ${
          isActive ? "text-[12px] text-primary-500" : "text-base top-1/2"
        }`}
      >
        {isActive ? activePlaceholder : placeholder}
      </label>

      <input
        value={value}
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-primary-500 focus:border-primary-500"
        {...props}
      />
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default memo(Input);
