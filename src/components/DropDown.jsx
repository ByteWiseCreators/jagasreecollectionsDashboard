/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import PropTypes from "prop-types";

import { RiArrowDropDownLine } from "react-icons/ri";

const DropDown = ({
  dropdownValues = [],
  defaultValue = "",
  handleDropdownvalueChange,
  className = "px-5 py-1.5",
  w = "w-full",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    setIsOpen(false);
  };

  useEffect(() => {
    const defaultIndex = dropdownValues.indexOf(defaultValue);
    setSelectedIndex(defaultIndex >= 0 ? defaultIndex : 0);
  }, []);

  useEffect(() => {
    handleDropdownvalueChange(dropdownValues[selectedIndex]);
  }, [selectedIndex]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev === dropdownValues.length - 1 ? 0 : prev + 1
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) =>
        prev === 0 ? dropdownValues.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" || e.key === " ") {
      setIsOpen((prev) => !prev);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={classNames(
        "bg-primary-200 text-lg font-heading font-medium text-text relative",
        isOpen ? "rounded-t-md" : "rounded-md",
        w
      )}
    >
      <div
        onClick={() => setIsOpen((pv) => !pv)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={classNames(
          "flex items-center justify-between cursor-pointer outline-none",
          className
        )}
      >
        <span>{dropdownValues[selectedIndex]}</span>
        <RiArrowDropDownLine
          size={20}
          className={classNames(
            "transform transition-all duration-200",
            isOpen && "-rotate-180"
          )}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col absolute w-full bg-primary-200 rounded-b-md z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            {dropdownValues.map((value, i) => (
              <motion.span
                key={`${i}-${value}`}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: 0.05 * i,
                }}
                onClick={() => handleSelect(i)}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                className={classNames(
                  "cursor-pointer hover:bg-primary-300 px-5 py-1 last:rounded-b-md",
                  selectedIndex === i && "bg-primary-300"
                )}
              >
                {value}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

DropDown.propTypes = {
  dropdownValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.string,
  handleDropdownvalueChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  w: PropTypes.string,
  text: PropTypes.string,
};

export default DropDown;