import React from "react";
import { BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import { BASE_API } from "../../../config";

const ProductRow = ({
  productName,
  availableQty,
  orderQty,
  price,
  image,
  serialize,
  _id,
  refetch,
  creator,
  setModalProduct,
}) => {
  /* Handle Product Delete */
  const handleProductDelete = async (_id) => {
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
        fetch(`${BASE_API}/products/${_id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.deletedCount) {
              refetch();
              Swal.fire("Deleted!", "Products has been deleted.", "success");
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
      <td>{productName}</td>
      <td>{creator?.name}</td>
      <td>{availableQty}pcs</td>
      <td>{orderQty}pcs</td>
      <td>{price}$</td>
      <td>
        <label
          type="button"
          htmlFor="my-modal-3"
          className="btn btn-sm btn-success text-white modal-button"
          onClick={() =>
            setModalProduct({ _id, productName, availableQty, orderQty, price })
          }
        >
          Update
        </label>
      </td>
      <td>
        <button
          onClick={() => handleProductDelete(_id)}
          className="btn bg-red-600 border-red-600 text-white btn-sm"
        >
          <BsTrash className="text-xl" />
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
