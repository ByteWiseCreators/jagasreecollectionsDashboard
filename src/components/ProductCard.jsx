import PropTypes from "prop-types";
import usePopupBackDrop from "../hooks/usePopupBackDrop";

import Button from "./Button";
import Carousel from "./Carousel";
import ProductForm from "./ProductForm.jsx";
import { useState } from "react";
import ConformDelete from "./ConformDelete.jsx";

const ProductCard = ({ name, description, imgs, productDetials }) => {
  const [isEdit, setIsEdit] = useState(true);
  const { BackDrop, openPopup, closePopup } = usePopupBackDrop(false, true);

  const openEditPopup = () => {
    setIsEdit(true);
    openPopup();
  };

  const openDeletePopup = () => {
    setIsEdit(false);
    openPopup();
  };

  return (
    <>
      <div className="flex flex-col border hover-elavate rounded bg-primary-100 w-full sx:max-w-64">
        <div className="rounded-t-xl">
          <Carousel
            images={imgs}
            heightOfImg="h-[280px]"
            options={{
              buttonColor: "#fefefe70",
              buttonSize: 16,
              pageNavActiveColor: "#6a42c2",
              pageNavColor: "#eeecfb",
            }}
          />
        </div>
        <div className="px-2 pb-2 pt-1 space-y-2">
          <h3 className="font-heading text-2xl font-bold text-text">
            {name.length > 20 ? name.substring(0, 20) + " ..." : name}
          </h3>
          <p className="font-body font-medium text-gray-600 leading-[18px] h-14 overflow-y-hidden text-pretty">
            {description.length > 70
              ? description.substring(0, 70) + " ..."
              : description}
          </p>
          <div className="flex gap-2 justify-between">
            <Button
              className="w-full bg-primary-500 hover:bg-primary-600"
              size="md"
              onClick={openEditPopup}
            >
              Edit
            </Button>
            <Button
              className="w-full bg-primary-800 hover:bg-primary-900"
              size="md"
              onClick={openDeletePopup}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      <BackDrop>
        {isEdit ? (
          <ProductForm product={productDetials} closePopup={closePopup} />
        ) : (
          <ConformDelete product={productDetials} closePopup={closePopup} />
        )}
      </BackDrop>
    </>
  );
};

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgs: PropTypes.arrayOf(PropTypes.string).isRequired,
  productDetials: PropTypes.object,
};

export default ProductCard;
