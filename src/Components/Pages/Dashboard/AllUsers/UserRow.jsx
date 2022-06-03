import React from "react";
import { FiDelete } from "react-icons/fi";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const UserRow = ({ user, index, refetch }) => {
  const { _id, email, role, uid } = user;

  /* Handle Delete User */
  const handleUserDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        fetch(`https://gadgets-emporium.herokuapp.com/user/${email}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.deletedCount) {
              toast.success(`${email} is deleted.`);
              refetch();
            }
          });
      }
    });
  };

  const makeAdmin = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make it!",
    }).then((willAdmin) => {
      if (willAdmin.isConfirmed) {
        fetch(`https://gadgets-emporium.herokuapp.com/user/admin`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(user),
        })
          .then((res) => {
            if (res.status === 403) {
              toast.error("Failed to Make an admin");
            }
            return res.json();
          })
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              toast.success(`${email} is an admin now.`);
            }
          });
      }
    });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{uid ? uid : "Not Available"}</td>
      <td>{email}</td>
      <td>
        {role === "admin" ? (
          ""
        ) : (
          <button onClick={makeAdmin} className="btn btn-xs text-white">
            Make Admin
          </button>
        )}
      </td>
      <td>
        {role === "admin" ? (
          <span className="badge bg-primary text-white border-primary">
            Admin
          </span>
        ) : (
          <span className="badge text-white">User</span>
        )}
      </td>
      <td>
        <label
          onClick={() => handleUserDelete(_id)}
          htmlFor="user-delete-confirm-modal"
          className="text-red-500 cursor-pointer"
        >
          <FiDelete className="text-2xl"></FiDelete>
        </label>
      </td>
    </tr>
  );
};

export default UserRow;
