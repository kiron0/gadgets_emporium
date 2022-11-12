import React from "react";
import { Fade } from "react-reveal";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { BASE_API } from "../../../config";
import useTitle from "../../../hooks/useTitle";
import auth from "../../../auth/Firebase/Firebase.init";
import Loader from "../../../components/Loader/Loader";
import OrderRow from "./OrderRow";
import useScrollToTop from "../../../hooks/useScrollToTop";
const MyOrders = () => {
  useTitle("My Orders");
  useScrollToTop();
  const { data, isLoading, refetch } = useQuery("Orders", () =>
    fetch(`${BASE_API}/orders?uid=${auth?.currentUser?.uid}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) return <Loader />;
  const orderData = data;
  return (
    <section className="my-orders">
      <div className="title my-5">
        <h2 className="text-2xl">My Orders</h2>
        <span>Here you will get all the orders.</span>
      </div>
      <Fade top distance="20px">
        <div className="overflow-x-auto shadow-xl rounded-xl">
          {orderData?.length > 0 ? (
            <table className="table w-full">
              <thead className="bg-base-300">
                <tr>
                  <th>No</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Order Quantity</th>
                  <th>Prices (per)</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>TransactionID</th>
                  <th>Status</th>
                  <th>Situation</th>
                  <th>Pay</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order, ind) => (
                  <OrderRow
                    key={order._id}
                    {...order}
                    serialize={ind}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <div className="grid place-items-center py-10">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyS0g4KI9aJhPYuJLsGMoKRd603nvd0Ia9YxxJ8kKw93PUkrhNx6LuIIQXM05YKdIL7Zc&usqp=CAU"
                  alt="order-not-found"
                />
                <h2 className="text-2xl py-3 font-semibold text-center">
                  Not Order Placed yet.
                </h2>
                <Link to="/shop" className="btn btn-primary text-white">
                  Make Order
                </Link>
              </div>
            </>
          )}
        </div>
      </Fade>
    </section>
  );
};

export default MyOrders;
