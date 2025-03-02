import classNames from "classnames";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { IoCloseOutline } from "react-icons/io5";

const usePopupBackDrop = (showCloseBtn, closePopupWithBackdrop) => {
  const [isPopupOpen, setPopupIsOpen] = useState(false);

  const openPopup = useCallback(() => {
    setPopupIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closePopup = useCallback(() => {
    setPopupIsOpen(false);
    document.body.style.overflow =
      document.body.style.overflow === "hidden" ? "auto" : "";
  }, []);

  const BackDropWrapper = ({ children }) => (
    <AnimatePresence>
      {isPopupOpen && (
        <BackDrop
          showCloseBtn={showCloseBtn}
          closePopupWithBackdrop={closePopupWithBackdrop}
          closePopup={closePopup}
        >
          {children}
        </BackDrop>
      )}
    </AnimatePresence>
  );

  BackDropWrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return { BackDrop: BackDropWrapper, openPopup, closePopup };
};

export default usePopupBackDrop;

// eslint-disable-next-line react-refresh/only-export-components
const BackDrop = ({
  closePopupWithBackdrop,
  showCloseBtn = true,
  children,
  closePopup = () => {},
}) => (
  <motion.div
    className={classNames(
      `popup fixed z-[99] top-0 left-0 h-full w-full bg-black/70 flex justify-center items-center ${
        closePopupWithBackdrop ? "cursor-pointer" : ""
      }`
    )}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={closePopupWithBackdrop ? closePopup : null}
  >
    <div onClick={(e) => e.stopPropagation()}>
      {children}
    </div>

    <motion.div
      initial={{ x: 100, opacity: 0.3 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0.3 }}
      onClick={closePopup}
      className={classNames(`absolute top-6 right-6
        md:top-1/2 md:right-[20%] z-[100] rounded-full theam-grad-1 p-1 cursor-pointer ${
          showCloseBtn ? "" : "hidden"
        }`)}
    >
      <IoCloseOutline className="size-10 sm:size-12 text-white" />
    </motion.div>
  </motion.div>
);

BackDrop.propTypes = {
  children: PropTypes.node,
  closePopup: PropTypes.func,
  showCloseBtn: PropTypes.bool,
  closePopupWithBackdrop: PropTypes.bool,
};
