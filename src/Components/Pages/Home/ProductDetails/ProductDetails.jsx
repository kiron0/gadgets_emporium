import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import "./ProductDetails.css";
import useTitle from "../../../hooks/useTitle";
import auth from "../../Shared/Firebase/Firebase.init";
import Loader from "../../Shared/Loader/Loader";
import useAdmin from "../../../hooks/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";

const ProductDetails = () => {
  const [error, setError] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);

  const { data, isLoading, refetch } = useQuery("products", () =>
    fetch(`http://localhost:5000/products/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  const [orderQtyField, setOrderQtyField] = useState(0);
  useTitle(data?.productName);
  if (isLoading || !data.image) return <Loader />;

  const {
    _id,
    image,
    productName,
    productDescription,
    price,
    availableQty,
    orderQty,
  } = data;

  const handlePlaceOrderForm = async (event) => {
    event.preventDefault();
    const phone = event.target.phone.value;
    const address = event.target.address.value;
    const orderQty = event.target.orderQty.value;
    if (orderQty > availableQty)
      return toast.error("Stock Out! The product will be available soon.");
    if (!phone) return toast.error(`Phone field is required`);
    if (!/[0-9]/.test(phone))
      return toast.error(`Phone Number must be number value`);
    if (!address) return toast.error(`Address field is required`);
    if (!orderQty) return toast.error(`Order Quantity field is required`);
    const orderData = {
      uid: auth?.currentUser?.uid,
      productInfo: {
        productName,
        image,
        price,
        availableQty,
        orderQty,
        id: _id,
      },
      address: {
        address,
        phone,
      },
      author: {
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email,
      },
      createdAt:
        new Date().toDateString() + "-" + new Date().toLocaleTimeString(),
    };
    sendOrderData(orderData);
  };

  const sendOrderData = async (data) => {
    await fetch(`http://localhost:5000/orders?uid=${auth?.currentUser?.uid}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.order) {
          fetch(`http://localhost:5000/products/updateQty/${id}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              availableQty:
                Number(availableQty) - Number(orderQtyField || orderQty),
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result?.modifiedCount) {
                refetch();
                toast.success("Order placed successfully");
                formRef.current.reset();
              } else {
                toast.error("Something went wrong");
              }
            });
        }
      });
  };

  const handleOrderQty = (event) => {
    setOrderQtyField(event.target.value);
    const value = Number(event.target.value);
    const orderQtyValue = Number(orderQty);
    const totalStock = Number(availableQty);
    if (value > totalStock) {
      setError(`Your order quantity should be in ${totalStock}`);
    } else if (value < orderQtyValue) {
      setError(`Quantity must be greater than ${orderQtyValue}`);
    } else {
      setError("");
    }
  };

  return (
    <section className="p-4 md:p-10 h-screen">
      <div className="container mx-auto py-4 lg:py-16">
        <div className="shadow-md my-5 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg">
          <div>
            <div className="flex items-center gap-2">
              <MdArrowBackIos
                onClick={() => navigate(-1)}
                className="cursor-pointer"
              />
              <h3 className="text-2xl">{productName}</h3>
            </div>
            <img
              src={image}
              alt={productName}
              className="w-full h-80 object-contain rounded-xl"
            />
            <ul className="flex flex-wrap items-center gap-3">
              <li>
                Minimum Order Quantity -<strong>{orderQty} pcs</strong>
              </li>
              <li>
                Available Quantity -<strong>{availableQty} pcs</strong>
              </li>
              <li>
                Per Unit Prices - <strong>{price}$</strong>
              </li>
            </ul>
            <div className="desc my-4 text-sm text-slate-500 font-montserrat">
              {productDescription}
            </div>
          </div>
          <div>
            <form ref={formRef} onSubmit={handlePlaceOrderForm} action="">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  value={auth?.currentUser?.displayName}
                  readOnly
                  className="bg-base-300 p-3 rounded outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <label htmlFor="name">Email</label>
                <input
                  type="text"
                  value={auth?.currentUser?.email}
                  readOnly
                  className="bg-base-300 p-3 rounded outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  className="border p-3 rounded outline-none bg-base-100"
                  id="phone"
                  placeholder="Phone Number"
                  name="phone"
                />
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <label htmlFor="address">Shipping Address</label>
                <textarea
                  type="text"
                  className="border p-3 rounded outline-none bg-base-100"
                  id="address"
                  name="address"
                  placeholder="Address"
                  style={{ resize: "none", height: "6rem" }}
                ></textarea>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <label htmlFor="orderQty">Order Quantity</label>
                <input
                  type="number"
                  className={`border p-3 rounded outline-none bg-base-100${
                    error && "border-error"
                  }`}
                  name="orderQty"
                  id="orderQty"
                  onChange={handleOrderQty}
                  value={orderQtyField || orderQty}
                />
                {error && <small className="text-error">{error}</small>}
              </div>
              <div className="my-3">
                {admin ? (
                  <></>
                ) : (
                  <button
                    className="btn btn-primary text-white"
                    disabled={error && true}
                  >
                    Place Order
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
