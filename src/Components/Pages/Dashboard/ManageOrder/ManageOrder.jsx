import React from "react";
import { useQuery } from "react-query";
import useTitle from "../../../hooks/useTitle";
import Loader from "../../Shared/Loader/Loader";
import OrderManageRow from "./OrderManageRow";

const ManageOrder = () => {
  useTitle("Manage Order");

  const { data, isLoading, refetch } = useQuery("orders", () =>
    fetch(`http://localhost:5000/orders/all`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) return <Loader />;
  const orderData = data;

  return (
    <div className="p-4">
      <div className="title my-4 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold">Manage Orders</h3>
          <span>You can manage all the orders from here</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        {orderData?.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Image</th>
                <th>Status</th>
                <th>Shipped</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, ind) => (
                <OrderManageRow
                  key={order._id}
                  {...order}
                  refetch={refetch}
                  serialize={ind}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <div className="py-10 text-center">
              <h3 className="text-3xl font-semibold">No Order Placed yet.</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageOrder;
