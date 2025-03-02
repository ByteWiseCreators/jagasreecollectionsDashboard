import privacyPolicy from "../assets/privacyPolicy.svg";
import shoppingPolicy from "../assets/shoppingPolicy.svg";

import PolicyCard from "../components/PolicyCard.jsx";

import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

const Policy = () => {
  const { policies } = useContext(DashboardContext);

  return (
    <section className="overflow-x-hidden py-5">
      <h2 className="font-heading text-3xl font-semibold text-text mb-6">
        Manage Policies
      </h2>
      <div className="flex gap-5 flex-wrap">
        <PolicyCard
          title="Privacy Policy"
          submitEndpoint="policy/privacy"
          imgSrc={privacyPolicy}
          content={policies.privacyPolicy}
        />
        <PolicyCard
          title="Shopping Policy"
          submitEndpoint="policy/shopping"
          imgSrc={shoppingPolicy}
          content={policies.shoppingPolicy}
        />
      </div>
    </section>
  );
};

export default Policy;