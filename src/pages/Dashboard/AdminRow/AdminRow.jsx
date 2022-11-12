import React from "react";
import { toast } from "react-hot-toast";
import { RiDeleteBack2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { BASE_API } from "../../../../config";
import auth from "../Firebase/firebase.init";
const AdminRow = ({ uid, serialize, email, role, refetch, _id }) => {
  /* Handle Make Admin  */
  const handleMakeAdmin = async (id) => {
    await fetch(
      `${BASE_API}/users/admin?uid=${id}&&currentUserId=${auth?.currentUser?.uid}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "admin" }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success(result?.message);
          refetch();
        }
      });
  };

  /* Handle delete User */
  const handleDeleteUser = async (id) => {
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
        fetch(
          `${BASE_API}/users?uid=${auth?.currentUser?.uid}&&deleteId=${id}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <tr>
      <th>{serialize + 1}</th>
      <td>{uid}</td>
      <td>{email}</td>
      <td>
        {role === "admin" ? (
          <button className="badge badge-primary">Admin</button>
        ) : (
          <button className="badge badge-success">User</button>
        )}
      </td>
      <td>
        {auth?.currentUser?.uid === uid ? (
          <span className="badge bg-green-300 border-green-300 text-white">
            Active{" "}
          </span>
        ) : (
          ""
        )}
      </td>
      <td>
        <button
          onClick={() => handleMakeAdmin(uid)}
          className="btn btn-primary btn-sm"
          disabled={role === "admin" && true}
        >
          Make Admin
        </button>
      </td>
      <td>
        <button onClick={() => handleDeleteUser(_id)}>
          <RiDeleteBack2Line />
        </button>
      </td>
    </tr>
  );
};

export default AdminRow;
