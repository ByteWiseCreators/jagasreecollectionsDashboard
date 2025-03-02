import { useContext } from "react";
import DetialsCard from "../components/DetialsCard.jsx";

import { DashboardContext } from "../context/DashboardContext.jsx";

import mensCollection from "../assets/1.png";
import womensCollection from "../assets/2.png";
import kidsCollection from "../assets/3.png";

const Dashbord = () => {
  const { products } = useContext(DashboardContext);

  const filterProductAndCount = (catogery) => {
    const filteredCatogory = products.filter(
      (product) => product.category === catogery
    );
    return (type) =>
      filteredCatogory.filter((product) => product.type === type).length;
  };

  return (
    <section className="overflow-x-hidden py-5 space-y-10">
      <div>
        <h2 className="font-heading text-3xl font-semibold text-text mb-6">
          Items Currently in Live
        </h2>
        <div className="flex flex-wrap gap-5">
          <DetialsCard
            src={mensCollection}
            title="Men"
            count={{
              ethnic: filterProductAndCount("Mens")("Ethnic"),
              fashon: filterProductAndCount("Mens")("Fashion"),
            }}
          />
          <DetialsCard
            src={womensCollection}
            title="Women"
            count={{
              ethnic: filterProductAndCount("Womens")("Ethnic"),
              fashon: filterProductAndCount("Womens")("Fashion"),
            }}
          />
          <DetialsCard
            src={kidsCollection}
            title="Kid"
            count={{
              ethnic: filterProductAndCount("Kids")("Ethnic"),
              fashon: filterProductAndCount("Kids")("Fashion"),
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Dashbord;
