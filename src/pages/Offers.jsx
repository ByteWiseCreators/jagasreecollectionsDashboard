import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../context/DashboardContext";

import OfferImageUplode from "../components/OfferImageUplode";
import { deleteOfferImg, uploadeOfferImg } from "../Utils/dbUtils";

const Offers = () => {
  const { offersImgArr, notify } = useContext(DashboardContext);
  const [offerImages, setOfferImages] = useState([]);

  useEffect(() => {
    setOfferImages([...offersImgArr]);
  }, []);

  const handleFileChange = async (file) => {
    const fileArray = Array.from(file);

    const formData = new FormData();
    formData.append("offer", file[0]);

    const resMsg = await uploadeOfferImg(formData);
    notify({message: resMsg, type: "success"});

    setOfferImages((prev) => [...prev, ...fileArray]);
  };

  const handleRemoveImage = async (index) => {
    const resMsg = await deleteOfferImg(index);
    notify({message: resMsg, type: "success"});
    setOfferImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="overflow-x-hidden py-5">
      <h2 className="font-heading text-3xl font-semibold text-text mb-6">
        Manage Offer popups
      </h2>
      <div className="flex gap-5 flex-wrap">
        <OfferImageUplode
          fileArray={offerImages}
          handleFileChange={handleFileChange}
          handleRemoveImage={handleRemoveImage}
        />
      </div>
    </section>
  );
};

export default Offers;
