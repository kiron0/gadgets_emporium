import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { MdArrowBackIos } from "react-icons/md";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import auth from "../../Shared/Firebase/Firebase.init";
import Loader from "../../Shared/Loader/Loader";

import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51JQc40Cqn9XOgqTm7I8yc2xHS4lhFQpzsrqm5Z68LqNBfHMED6oN4HWhbRSyR2aQIiOBTdRkBXBocvhtt0dFdK9W00C3TParQx"
);

const Payment = () => {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery("Orders", () =>
    fetch(`http://localhost:5000/orders?uid=${auth?.currentUser?.uid}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  useTitle("Payment Option");
  if (isLoading) return <Loader />;
  const singleOrder = data.find((order) => order._id === paymentId);

  return (
    <div className="grid place-items-center min-h-[80vh] lg:px-3 py-8">
      <div className="card shadow-lg rounded-lg w-full lg:w-1/3 md:w-2/3">
        <div className="card-body p-4">
          <div className="flex items-center gap-3">
            <MdArrowBackIos
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h3 className="text-xl font-semibold">
              {singleOrder?.productInfo?.productName}
            </h3>
          </div>
          <img
            src={singleOrder?.productInfo?.image}
            alt={singleOrder?.productInfo?.productName}
            className="rounded w-full h-52 object-contain my-3"
          />
          <ul className="flex flex-wrap flex-col gap-2 items-start  my-4">
            <li className="flex items-center justify-between w-full">
              Order Quantity -{" "}
              <strong>{singleOrder?.productInfo?.orderQty}pcs</strong>
            </li>
            <li className="flex items-center justify-between w-full">
              Price
              <strong>{singleOrder?.productInfo?.price}$</strong>
            </li>
            <li className="flex items-center justify-between w-full">
              Name - <strong>{singleOrder?.author?.name}</strong>
            </li>
            <li className="flex items-center justify-between w-full">
              Email - <strong>{singleOrder?.author?.email}</strong>
            </li>
          </ul>
          <div className="payment-option">
            <Elements stripe={stripePromise}>
              <CheckoutForm singleOrder={singleOrder} refetch={refetch} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
