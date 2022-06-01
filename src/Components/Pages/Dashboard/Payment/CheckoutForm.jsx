import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../../Firebase/firebase.init";

const CheckoutForm = ({ singleOrder, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  const totalPrice =
    Number(singleOrder?.productInfo?.orderQty) *
    Number(singleOrder?.productInfo?.price);
  useEffect(() => {
    fetch(
      `https://gadgets-emporium.herokuapp.com/payment/create-payment-intent`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ price: totalPrice }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result?.clientSecret) {
          setClientSecret(result.clientSecret);
        }
      });
  }, [totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      return toast.error(error?.message);
    }

    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: singleOrder?.author?.name,
            email: singleOrder?.author?.email,
          },
        },
      });

    if (intentError) {
      return toast.error(intentError?.message);
    } else {
      if (paymentIntent?.status === "succeeded") {
        const data = {
          uid: auth?.currentUser?.uid,
          author: {
            name: singleOrder?.author?.name,
            email: auth?.currentUser.email,
          },
          productInfo: {
            id: singleOrder?.productInfo?.id,
            productName: singleOrder?.productInfo?.productName,
            price: singleOrder?.productInfo?.price,
            orderQty: singleOrder?.productInfo?.orderQty,
            image: singleOrder?.productInfo?.image,
          },
          transactionId: paymentIntent?.id,
          status: paymentIntent?.status,
          createdAt:
            new Date().toDateString() + " " + new Date().toLocaleTimeString(),
        };
        fetch(
          `https://gadgets-emporium.herokuapp.com/booking?id=${singleOrder?._id}`,
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        )
          .then((res) => res.json())
          .then((result) => {
            if (result?.insertedId) {
              navigate(`/dashboard/my-orders`);
              fetch(
                `https://gadgets-emporium.herokuapp.com/orders/paid/${singleOrder?._id}`,
                {
                  method: "PATCH",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    ...data,
                    paid: "true",
                  }),
                }
              )
                .then((res) => res.json())
                .then((modify) => {
                  if (modify?.modifiedCount) {
                    refetch();
                    Swal.fire(
                      "Congrats!!",
                      ` Payment successfully done. Here is your TransactionID ${paymentIntent?.id}`,
                      "success"
                    );
                  }
                });
            }
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-4 font-montserrat">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        className="btn btn-primary my-8 w-full text-white"
        disabled={!stripe}
      >
        Pay {totalPrice}$
      </button>
    </form>
  );
};

export default CheckoutForm;
