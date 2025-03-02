import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../context/DashboardContext";
import Button from "../components/Button";

import { FaAmazon, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiFlipkart } from "react-icons/si";
import { TbBrandMeetup } from "react-icons/tb";
import { IoMailOutline } from "react-icons/io5";
import { updateSocials } from "../Utils/dbUtils";

const SocialMedia = () => {
  const { socials, notify } = useContext(DashboardContext);
  const [socialMedias, setSocialMedias] = useState({});
  const [updatedFields, setUpdatedFields] = useState({});

  useEffect(() => {
    setSocialMedias(socials);
    setUpdatedFields({});
  }, [socials]);

  const handleInputChange = (e, field) => {
    const newValue = e.target.value;

    setSocialMedias((prev) => ({ ...prev, [field]: newValue }));
    setUpdatedFields((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Fields:", updatedFields);
    const resMsg = await updateSocials(updatedFields);
    notify({ message: resMsg, type: "success" });
  };

  const dataObjects = [
    { icon: <FaWhatsapp />, name: "WhatsApp", keyOfField: "whatsapp" },
    { icon: <FaInstagram />, name: "Instagram", keyOfField: "instagram" },
    { icon: <IoMailOutline />, name: "Email", keyOfField: "email" },
    { icon: <FaAmazon />, name: "Amazon", keyOfField: "amazon" },
    { icon: <SiFlipkart />, name: "Flipkart", keyOfField: "flipkart" },
    { icon: <TbBrandMeetup />, name: "Meesho", keyOfField: "meesho" },
  ];

  return (
    <section className="overflow-x-hidden py-5">
      <h2 className="font-heading text-3xl font-semibold text-text mb-8">
        Update Social Media
      </h2>
      <form
        onSubmit={handleSubmit}
        className="font-body text-text text-xl w-full sm:w-[600px]"
      >
        <table className="table-auto w-full text-left">
          <tbody>
            {dataObjects.map((data, index) => (
              <TableData
                key={index}
                {...data}
                value={socialMedias[data.keyOfField] || ""}
                onChange={handleInputChange}
              />
            ))}
          </tbody>
        </table>
        <Button type="submit" className="theam-grad-1 mt-2 flex items-center">
          Save Changes
        </Button>
      </form>
    </section>
  );
};

export default SocialMedia;

const TableData = ({ icon, value, name, onChange, keyOfField }) => {
  return (
    <tr className="border-b">
      <td className="flex items-center gap-2 font-semibold py-3">
        {icon}
        {name}:
      </td>
      <td>
        <input
          name={keyOfField}
          value={value}
          onChange={(e) => onChange(e, keyOfField)}
          type="text"
          className="w-full outline-none pt-[3px]"
          placeholder="Add your link or number"
        />
      </td>
    </tr>
  );
};

TableData.propTypes = {
  icon: PropTypes.element,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  keyOfField: PropTypes.string,
};
