import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { BASE_API } from "../../../config";
import { InitializeContext } from "../../../App";
import auth from "../../../auth/Firebase/Firebase.init";
import avatar from "../../../assets/avatar.jpg";

const UserRow = ({ user, index, refetch }) => {
  const { theme } = useContext(InitializeContext);
  const { _id, email, role, uid, image, displayName } = user;

  /* Handle Delete User */
  const handleUserDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: theme === "night" ? "#333" : "#fff",
      color: theme === "night" ? "#fff" : "#333",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        fetch(`${BASE_API}/user/${email}`, {
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
    fetch(`${BASE_API}/user/admin`, {
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
          Swal.fire({
            title: "Success!",
            text: `${email} is now an admin.`,
            icon: "success",
          });
        }
      });
  };
  const removeAdmin = () => {
    fetch(`${BASE_API}/user/removeAdmin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to Remove an admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: `${email} is user now.`,
            icon: "success",
          });
        }
      });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        {image ? (
          <a href={image} target="_blank" rel="noreferrer">
            <img
              src={image}
              alt=""
              className="rounded-full w-[2.5rem] h-[2.5rem] shadow-sm bg-base-200 border p-1"
            />
          </a>
        ) : (
          <img
            src={avatar}
            alt=""
            className="rounded-full w-[2.5rem] h-[2.5rem] shadow-sm bg-base-200 border p-1"
          />
        )}
      </td>
      <td>
        <span className="tooltip" data-tip={uid ? uid : "Not available"}>
          {displayName ? displayName : "Not Available"}
        </span>
      </td>
      <td>{email}</td>
      <td>
        {auth?.currentUser?.uid === uid ? (
          <></>
        ) : (
          <span className="tooltip" data-tip="Change user role">
            <select
              className={`select select-bordered w-full max-w-xs ${
                role === "admin" ? "select-secondary" : "select-info"
              }`}
              defaultValue={role === "admin" ? "Admin" : "User"}
              onChange={(e) => {
                if (e.target.value === "Admin") {
                  makeAdmin();
                } else {
                  removeAdmin();
                }
              }}
            >
              <option disabled selected>
                Select Role
              </option>
              <option>User</option>
              <option>Admin</option>
            </select>
          </span>
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
        {auth?.currentUser?.uid === uid ? (
          <span className="badge bg-green-500 border-green-500 text-white">
            Active{" "}
          </span>
        ) : (
          ""
        )}
      </td>
      <td>
        {auth?.currentUser?.uid === uid ? (
          <></>
        ) : (
          <span className="tooltip tooltip-error" data-tip="Delete user data!">
            <label
              onClick={() => handleUserDelete(_id)}
              htmlFor="user-delete-confirm-modal"
              className="btn btn-sm btn-error text-white"
            >
              <i className="bx bxs-trash"></i>
            </label>
          </span>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
