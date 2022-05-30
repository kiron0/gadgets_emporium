import React from "react";
import { FiDelete } from "react-icons/fi";

const UserRow = ({ user, setDeletingUser, index }) => {
  const { email, role, uid } = user;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{uid ? uid : "Not Available"}</td>
      <td>{email}</td>
      <td>
        {role === "admin" ? (
          <span className="badge bg-primary text-white">Admin</span>
        ) : (
          <span className="badge text-white">User</span>
        )}
      </td>
      <td>
        <label
          onClick={() => setDeletingUser(user)}
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
