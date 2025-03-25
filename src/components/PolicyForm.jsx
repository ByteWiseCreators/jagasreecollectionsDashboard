import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import FileInput from "./FileInput";
import Button from "./Button";
import { uploadMds } from "../Utils/dbUtils";
import { DashboardContext } from "../context/DashboardContext";

const PolicyForm = ({ title, submitEndpoint }) => {
  const { notify } = useContext(DashboardContext);
  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (files) => {
    setFile(Array.from(files));
  };

  const handleSubmit = async (e) => {
    if (file.length === 0) {
      notify({ message: "Please select a file", type: "warning" });
      return;
    }

    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("md", file[0]);
    const res = await uploadMds(submitEndpoint, formData);
    notify({ message: res, type: "success" });
    setIsLoading(false);
  };
  return (
    <motion.div
      initial={{ y: -20, opacity: 0.3 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0.3 }}
      className="bg-bg p-8 rounded-lg max-w-md mx-auto shadow-lg w-full sx:w-[430px] cursor-auto"
    >
      <h2 className="text-primary-700 font-heading text-2xl font-semibold mb-6">
        Update {title}
      </h2>
      <form className="flex flex-col">
        <FileInput
          text="Uplode md file"
          fileType="markdown"
          fileArray={file}
          handleFileChange={handleFileChange}
        />
        <Button
          onClick={handleSubmit}
          type="submit"
          className="theam-grad-1 mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </motion.div>
  );
};

PolicyForm.propTypes = {
  title: PropTypes.string.isRequired,
  submitEndpoint: PropTypes.string.isRequired,
};

export default PolicyForm;
