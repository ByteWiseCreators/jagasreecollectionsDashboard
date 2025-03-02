import PropTypes from "prop-types";
import Button from "./Button";
import { deleteProduct } from "../Utils/dbUtils";
import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

const ConformDelete = ({ product, closePopup = () => {} }) => {
  const { notify, setProducts } = useContext(DashboardContext);

  const handleDelete = async () => {
    const resMsg = await deleteProduct(product.id);
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
    notify({ message: resMsg, type: "success" });
    closePopup();
  };

  return (
    <div>
      <div className="bg-primary-50 p-5 rounded-md space-y-5">
        <h2 className="font-heading text-2xl font-medium text-text text-center">
          Are you sure to delete this product?
          <span className="block font-bold text-neutral-500">
            {product.name} - {product.code}
          </span>
        </h2>
        <div className="flex gap-2">
          <Button className="w-full" onClick={closePopup}>
            No
          </Button>
          <Button onClick={handleDelete} variant="danger" className="w-full">
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

ConformDelete.propTypes = {
  product: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default ConformDelete;
