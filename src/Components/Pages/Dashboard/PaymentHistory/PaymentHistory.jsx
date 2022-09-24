import React, { useEffect, useState } from "react";
import Loader from "../../Shared/Loader/Loader";
import useTitle from "../../../hooks/useTitle";
import auth from "../../Shared/Firebase/Firebase.init";
import { BASE_API } from "../../../../config";

const PaymentHistory = () => {
  useTitle("Payment History");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(
      `${BASE_API}/payment/history?uid=${auth?.currentUser?.uid}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setLoading(true);
        setPayments(result);
      });
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold">Payment History</h2>
      <div className="overflow-x-auto my-5">
        {loading ? (
          payments.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Order Quantity</th>
                  <th>TransactionID</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, ind) => (
                  <tr key={payment._id}>
                    <th>{ind + 1}</th>
                    <th>
                      <img
                        src={payment?.productInfo?.image}
                        alt={payment?.productInfo?.productName}
                        width={60}
                        className="rounded shadow-sm bg-base-300 border p-1"
                      />
                    </th>
                    <td>{payment?.productInfo?.productName}</td>
                    <td>{payment?.productInfo?.price}$</td>
                    <td>{payment?.productInfo?.orderQty} pcs</td>
                    <td>{payment?.transactionId}</td>
                    <td>
                      <button className="btn btn-xs btn-success">Paid</button>
                    </td>
                    <td>{payment?.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <div className="grid place-items-center py-10">
                <img
                  width={450}
                  src="https://assets.materialup.com/uploads/c49f60e7-655f-4ddd-bf29-7e702828d651/preview.png"
                  alt="order-detail"
                />
                <h3 className="text-2xl font-semibold">
                  No Payment found yet.
                </h3>
              </div>
            </>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
