import Policy from "./Policy";
import Offers from "./Offers";
import Abouts from "./Abouts";
import SocialMedia from "./SocialMedia";

const Management = () => {
  return (
    <div className="min-h-screen">
      <Policy />
      <Offers />
      <Abouts />
      <SocialMedia />
    </div>
  );
};

export default Management;