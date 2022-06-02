import React from "react";
import useCarts from "../../../hooks/useCarts";

const AddToCart = () => {
  const [carts] = useCarts();

  if (carts?.length === undefined) {
    return [];
  }
  return (
    <div>
      <input type="checkbox" id="AddToCart" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          <label
            htmlFor="AddToCart"
            class="btn btn-sm btn-circle btn-primary text-white absolute right-2 top-2"
          >
            ✕
          </label>
          <h2>{carts?.length}</h2>
          {
            <ul className="list-none">
              {carts.map((cart) => (
                <li key={cart.id}>{cart.uid}</li>
              ))}
            </ul>
          }
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
