import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import auth from "../Shared/Firebase/Firebase.init";
import Loader from "../Shared/Loader/Loader";

const Product = ({ product }) => {
  const [user] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const {
    _id,
    productName,
    price,
    productDescription,
    orderQty,
    availableQty,
    image,
  } = product;

  const navigate = useNavigate();

  // if (adminLoading) {
  //   return <Loader />;
  // }

  const addToCart = () => {
    console.log("add to cart");
  };

  return (
    <div className="card bg-base-100 shadow-xl" key={_id}>
      <figure>
        <img src={image} className="h-52 rounded-xl" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {productName}
          <div className="badge badge-secondary text-white">NEW</div>
        </h2>
        <p>{productDescription.slice(0, 60)}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-ghost bg-base-300">
            <span title="Minimum Order Quantity">MOQ</span>- {orderQty}pcs
          </div>
          <div className="badge badge-ghost bg-base-300">
            Available- {availableQty}pcs
          </div>
          <div className="badge badge-ghost bg-base-300">{price}$</div>
        </div>
        <div className="card-actions justify-center mt-2">
          {admin ? (
            <></>
          ) : (
            <button
              onClick={() => navigate(`/purchase/${_id}`)}
              className="btn btn-primary text-white mt-4"
            >
              Order Now
            </button>
          )}
          {admin ? (
            <></>
          ) : (
            <button
              className="btn btn-primary text-white mt-4"
              onClick={addToCart}
            >
              <MdOutlineShoppingCart className="text-xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
