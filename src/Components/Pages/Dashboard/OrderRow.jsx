import React from "react";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OrderRow = ({
  productInfo,
  address,
  serialize,
  _id,
  refetch,
  paid,
  transactionId,
  shipped,
}) => {
  const navigate = useNavigate();
  const { productName, price, orderQty, image } = productInfo;
  /* Handle Delete Order */
  const deleteOrder = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/orders/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.deletedCount) {
              refetch();
              Swal.fire("Deleted!", "Your order has been deleted.", "success");
            }
          });
      }
    });
  };
  return (
    <tr>
      <th>{serialize + 1}</th>
      <td>
        <img
          src={image}
          alt={productName}
          width={60}
          className="rounded shadow-sm bg-base-300 border p-1"
        />
      </td>
      <td>{productName} </td>
      <td>{orderQty}pcs</td>
      <td>{price}$</td>
      <td>{address?.address}</td>
      <td>{address?.phone}</td>
      <td>
        <small>{transactionId ? transactionId : "Not Available yet."}</small>
      </td>
      <td>
        <button
          className={`btn btn-xs  ${
            shipped
              ? "btn bg-green-400 text-white border-green-400"
              : "btn-error"
          }`}
        >
          {paid ? (shipped ? "Delivered" : "Processing") : "Pending"}
        </button>
      </td>
      <td>
        {paid ? (
          <button className="btn btn-success btn-sm">PAID</button>
        ) : (
          <button className="btn btn-accent btn-sm">UNPAID</button>
        )}
      </td>
      <td>
        <button
          disabled={paid && true}
          onClick={() => navigate(`/dashboard/payment/${_id}`)}
          className="btn-sm btn btn-primary"
        >
          {paid ? "Paid" : "Pay"} {Number(price) * Number(orderQty)}$
        </button>
      </td>
      <td>
        <button
          disabled={paid && true}
          onClick={() => deleteOrder(_id)}
          className="btn bg-red-600 border-red-600 text-white btn-sm"
        >
          <BsTrash />
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
