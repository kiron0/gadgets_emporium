import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import auth from "../../auth/Firebase/Firebase.init";

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
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={image} className="h-52 rounded-xl" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{productName}</h2>
        <p>{productDescription.slice(0, 60)}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-ghost bg-base-200">
            <span title="Minimum Order Quantity">MOQ</span>- {orderQty}pcs
          </div>
          <div className="badge badge-ghost bg-base-200">
            Available - {availableQty}pcs
          </div>
          <div className="badge badge-ghost bg-base-200">Price - {price}$</div>
        </div>
        <div className="card-actions justify-end mt-2">
          {admin ? (
            <div className="alert alert-error shadow-lg text-sm lg:text-base">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Hey, Admin! You can't order</span>
              </div>
            </div>
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
