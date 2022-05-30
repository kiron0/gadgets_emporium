import React from "react";
import { toast } from "react-hot-toast";

const UserDeleteConfirmModal = ({ deletingUser, refetch, setDeletingUser }) => {
  const { email } = deletingUser;

  const handleUserDelete = () => {
    fetch(`http://localhost:5000/user/${email}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success(`User: ${email} is deleted.`);
          setDeletingUser(null);
          refetch();
        } else {
          toast.error(`User: ${email} is not deleted.`);
        }
      });
  };
  return (
    <div>
      <input
        type="checkbox"
        id="user-delete-confirm-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500">Are you sure you?</h3>
          <p className="py-4">Are you sure you want to delete {email}?</p>
          <div className="modal-action">
            <button
              onClick={() => handleUserDelete()}
              className="btn btn-xs btn-error"
            >
              Delete
            </button>
            <label for="user-delete-confirm-modal" className="btn btn-xs">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDeleteConfirmModal;
