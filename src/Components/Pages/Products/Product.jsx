import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import auth from "../Shared/Firebase/Firebase.init";

const Product = ({ product }) => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
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
        <div className="card-actions justify-end mt-2">
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
        </div>
      </div>
    </div>
  );
};

export default Product;
