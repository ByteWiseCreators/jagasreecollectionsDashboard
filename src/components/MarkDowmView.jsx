import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import ReactMarkdowm from "react-markdown";
import PropTypes from "prop-types";

import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import "../css/Markdown.css";

const MarkDowmView = ({ content }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown")
        containerRef.current?.scrollBy({ top: 350, behavior: "smooth" });
      else if (e.key)
        containerRef.current?.scrollBy({ top: -350, behavior: "smooth" });
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <motion.div
        ref={containerRef}
        initial={{ y: -20, opacity: 0.3 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0.3 }}
        className="bg-slate-50 px-5 py-6 rounded-md w-full sm:max-w-[850px] max-h-[84vh] overflow-y-scroll cursor-auto markdown"
      >
        <ReactMarkdowm>{content}</ReactMarkdowm>
      </motion.div>
      <motion.div
        initial={{ x: -100, opacity: 0.3 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0.3 }}
        className="absolute hidden sm:block bottom-10 left-10 z-[100] theam-grad-1 font-medium rounded px-3 py-2"
      >
        <div className="flex items-center gap-1 text-white">
          Use <FaArrowUp /> <FaArrowDown /> Arrow
        </div>
      </motion.div>
    </>
  );
};

MarkDowmView.propTypes = {
  content: PropTypes.string,
};

export default MarkDowmView;
