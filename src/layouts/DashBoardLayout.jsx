import { Outlet } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames";

import SideBar from "../components/SideBar";

const DashBoardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex container px-4 mx-auto md:px-2">
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className={classNames("w-full",isSidebarOpen ? "ml-[250px]" : "ml-20")}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;