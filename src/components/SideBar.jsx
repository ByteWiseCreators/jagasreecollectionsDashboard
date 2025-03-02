import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import classNames from "classnames";
import PropTypes from "prop-types";

import {
  SlCloudUpload,
  SlSettings,
  SlUserFollowing,
} from "react-icons/sl";
import { RiMenuFold2Line, RiMenuFoldLine } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";

const SideBar = ({ isSidebarOpen = false, setIsSidebarOpen = () => {} }) => {
  const iconSize = 30;
  const dashBordLinks = [
    {
      icon: <BsGraphUpArrow size={iconSize} />,
      title: "Dashboard",
      link: "/",
    },
    {
      icon: <SlCloudUpload size={iconSize} />,
      title: "Inventory",
      link: "/inventory",
    },
    {
      icon: <SlSettings size={iconSize} />,
      title: "Management",
      link: "/management",
    },
    {
      icon: <SlUserFollowing size={iconSize} />,
      title: "Users",
      link: "/users",
    }
  ];

  return (
    <motion.section
      initial={{ width: "80px" }}
      animate={{ width: isSidebarOpen ? "250px" : "80px" }}
      transition={{ duration: 0.2, type: "spring" }}
      className="fixed top-0 left-0 z-10 h-full transition-all duration-150"
    >
      <div className="flex flex-col h-full border-r shadow-xl bg-neutral-50">
        <div className="bg-primary-600 text-white mb-4 py-1.5 pl-3">
          {!isSidebarOpen ? (
            <RiMenuFold2Line
              className="cursor-pointer p-2 size-[50px]"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            />
          ) : (
            <RiMenuFoldLine
              className="cursor-pointer p-2 size-[50px]"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            />
          )}
        </div>

        <div className={classNames(`flex flex-col gap-y-4 ${isSidebarOpen ? "px-3": "items-center"}`)}>
          {dashBordLinks.map((item, i) => (
            <NavLink to={item.link} key={`${item.title}-${i}`} end>
              <motion.div
                className={classNames(
                  `flex items-center gap-3 hover:bg-primary-500 hover:text-white rounded-md font-heading text-2xl`,
                  isSidebarOpen && "pr-3"
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: i * 0.08 }}
              >
                <div className="p-3 hover:bg-primary-500 transition-all duration-100 rounded-md">
                  {item.icon}
                </div>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      damping: 18 + i * 2,
                      stiffness: 120 + i * 8,
                      delay: i * 0.15,
                    }}
                  >
                    {item.title}
                  </motion.span>
                )}
              </motion.div>
            </NavLink>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SideBar;

SideBar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
};