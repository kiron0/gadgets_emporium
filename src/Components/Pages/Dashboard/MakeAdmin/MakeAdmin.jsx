import React, { useState } from "react";
import { toast } from "react-hot-toast";
import useTitle from "../../../hooks/useTitle";

const MakeAdmin = () => {
  useTitle("Make Admin");
  const [email, setEmail] = useState("");

  const handleOnBlur = (e) => {
    setEmail(e.target.value);
  };
  const handleAdminSubmit = (e) => {
    const user = { email };
    fetch(`https://gadgets-emporium.herokuapp.com/user/admin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success(`User: ${email} is now an admin.`);
          setEmail("");
        }
      });

    e.preventDefault();
  };
  return (
    <div className="lg:px-10 py-10 bg-base-100 max-h-[80vh] rounded-md">
      <div className="bg-base-300 pl-4 pb-44 pt-4 rounded-2xl">
        <form onSubmit={handleAdminSubmit}>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Type email"
            className="input input-bordered w-full max-w-sm"
            onBlur={handleOnBlur}
            required
          />
          <button className="btn btn-primary mt-4 lg:mt-0 md:ml-4 lg:ml-4 text-white">
            Make Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeAdmin;
