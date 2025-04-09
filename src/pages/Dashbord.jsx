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
    <section className="py-5 space-y-10 overflow-x-hidden">
      <div>
        <h2 className="mb-6 text-3xl font-semibold font-heading text-text">
          Items Currently in Live
        </h2>
        <div className="flex flex-wrap gap-5">
          <DetialsCard
            src={mensCollection}
            title="Men"
            count={{
              ethnic: filterProductAndCount("Mens")("Ethnic"),
              fashon: filterProductAndCount("Mens")("Fashion"),
              festive: filterProductAndCount("Mens")("Festive"),
            }}
          />
          <DetialsCard
            src={womensCollection}
            title="Women"
            count={{
              ethnic: filterProductAndCount("Womens")("Ethnic"),
              fashon: filterProductAndCount("Womens")("Fashion"),
              festive: filterProductAndCount("Womens")("Festive"),
            }}
          />
          <DetialsCard
            src={kidsCollection}
            title="Kid"
            count={{
              ethnic: filterProductAndCount("Kids")("Ethnic"),
              fashon: filterProductAndCount("Kids")("Fashion"),
              festive: filterProductAndCount("Kids")("Festive"),
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Dashbord;
