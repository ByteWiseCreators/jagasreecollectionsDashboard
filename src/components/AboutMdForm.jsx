import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import FileInput from "./FileInput";
import Button from "./Button";

const AboutMdForm = () => {
  const [file, setFile] = useState([]);

  const handleFileChange = async (files) => {
    setFile(Array.from(files));
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0.3 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0.3 }}
      className="bg-bg p-8 rounded-lg max-w-md mx-auto shadow-lg w-full sx:w-[430px]"
    >
      <h2 className="text-primary-700 font-heading text-2xl font-semibold mb-6">
        Update About
      </h2>
      <form className="flex flex-col">
        <FileInput
          text="Uplode md file"
          fileType="markdown"
          fileArray={file}
          handleFileChange={handleFileChange}
        />
        <Button type="submit" className="theam-grad-1 mt-4">
          Submit
        </Button>
      </form>
    </motion.div>
  );
};

AboutMdForm.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AboutMdForm;
