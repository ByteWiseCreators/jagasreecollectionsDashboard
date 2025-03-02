import PropTypes from "prop-types";
import classNames from "classnames";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export const Input = ({ className, icon: Icon, ...props }) => {
  return (
    <div className="relative max-w-sm font-body">
      <input
        className={classNames(
          `peer py-3 pe-0 ps-8 block w-full bg-transparent text-gray-700 font-semibold tracking-wide md:text-lg border-t-transparent border-b border-x-transparent border-b-gray-500 focus:border-t-transparent focus:border-x-transparent focus:border-b-primary-400 focus:placeholder:text-primary-400 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none outline-none placeholder:text-gray-500 placeholder:font-semibold`,
          className
        )}
        {...props}
      />
      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-1 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
        {Icon}
      </div>
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
};

export const InputPasword = ({ className, icon: Icon, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative max-w-sm font-body">
      <input
        type={showPassword ? "text" : "password"}
        className={classNames(
          `peer py-3 pe-0 ps-8 block w-full bg-transparent text-gray-700 font-semibold tracking-wide md:text-lg border-t-transparent border-b border-x-transparent border-b-gray-500 focus:border-t-transparent focus:border-x-transparent focus:border-b-primary-400 focus:placeholder:text-primary-400 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none outline-none placeholder:text-gray-500 placeholder:font-semibold`,
          className
        )}
        {...props}
      />
      <div
        role="button"
        onClick={() => setShowPassword((pv) => !pv)}
        className="absolute right-3 top-5 cursor-pointer"
      >
        {showPassword ? (
          <IoEyeOutline className="text-gray-800" />
        ) : (
          <IoEyeOffOutline className="text-gray-800" />
        )}
      </div>
      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-1 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
        {Icon}
      </div>
    </div>
  );
};

InputPasword.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
};