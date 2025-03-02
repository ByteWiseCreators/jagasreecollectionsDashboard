import { useState } from "react";
import PropTypes from "prop-types";

import usePopupBackDrop from "../hooks/usePopupBackDrop";

import PolicyForm from "./PolicyForm.jsx";
import MarkDowmView from "./MarkDowmView.jsx";

import { RxOpenInNewWindow } from "react-icons/rx";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";

const PolicyCard = ({ title, imgSrc, content, submitEndpoint }) => {
  const [openView, setOpenView] = useState(false);
  const { BackDrop, openPopup } = usePopupBackDrop(false, true);

  const openUpdatePolicy = () => {
    setOpenView(false);
    openPopup();
  };

  const openViewPolicy = () => {
    setOpenView(true);
    openPopup();
  };

  return (
    <>
      <div className="hover-elavate flex rounded-md overflow-hidden max-w-[400px] h-auto cursor-pointer border">
        <div className="basis-1/3 grid content-center">
          <img className="object-cover" src={imgSrc} />
        </div>
        <div className="px-5 py-3 basis-2/3 bg-primary-50/65">
          <h2 className="font-heading text-2xl font-semibold text-text">
            {title}
          </h2>
          <h4 className="space-x-3 font-body text-base font-medium">
            <span className="font-semibold">Last updated :</span>
            <span className="font-medium">03/11/2024</span>
          </h4>
          <div className="flex flex-col gap-2 mt-5 font-heading">
            <button
              onClick={openViewPolicy}
              className="py-1 text-text/80 font-medium flex gap-1 items-center px-3 max-w-fit border text-sm bg-white border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            >
              <RxOpenInNewWindow />
              View current policy
            </button>
            <button
              onClick={openUpdatePolicy}
              className="py-1 text-text/80 font-medium flex gap-1 items-center px-3 max-w-fit border text-sm bg-white border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            >
              <MdOutlineSystemUpdateAlt />
              Update policy
            </button>
          </div>
        </div>
      </div>
      <BackDrop>
        {openView ? (
          <MarkDowmView content={content} />
        ) : (
          <PolicyForm title={title} submitEndpoint={submitEndpoint} />
        )}
      </BackDrop>
    </>
  );
};

PolicyCard.propTypes = {
  title: PropTypes.string,
  imgSrc: PropTypes.string,
  content: PropTypes.string,
  submitEndpoint: PropTypes.string,
};

export default PolicyCard;
