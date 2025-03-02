import { useContext } from "react";
import aboutContent from "../assets/aboutContent.svg";
import { DashboardContext } from "../context/DashboardContext";

import PolicyCard from "../components/PolicyCard";

const Abouts = () => {
  const {about} = useContext(DashboardContext);
  
  return (
    <section className="overflow-x-hidden py-5">
      <h2 className="font-heading text-3xl font-semibold text-text mb-6">
        Manage About content
      </h2>
      <div className="flex gap-5 flex-wrap">
        <PolicyCard
          title="About content"
          submitEndpoint="about"
          imgSrc={aboutContent}
          content={about}
        />
      </div>
    </section>
  );
};

export default Abouts;