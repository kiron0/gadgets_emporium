import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import auth from "../Shared/Firebase/Firebase.init";
import Loading from "../Shared/Loading/Loading";

const ResetPassword = () => {
  const location = useLocation();
  const from = location?.state?.from || "/";
  const [error, setError] = useState();
  const [sending, setSending] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setSending(true);
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setSending(false);
        toast.success("Email sent");
      })
      .catch((error) => {
        setError(error.code);
        setSending(false);
      });
  };
  return (
    <div className="min-h-screen flex justify-center items-center px-0">
      {sending && <Loading />}
      <div className="py-12 px-12 rounded-2xl lg:w-3/12 ">
        <form
          className="grid grid-cols-1 gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-center w-full pb-4 font-bold text-xl">
            Reset password
          </p>
          <p className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="input input-bordered w-full mt-2"
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please provide a valid email address",
                },
                required: {
                  value: true,
                  message: "Please input your email address",
                },
              })}
            />
            <p className="text-red-700">
              <small>{error?.email?.message}</small>
            </p>
          </p>
          <input
            type="submit"
            value="Reset email"
            className="btn btn-primary w-full text-white"
          />
          <p className="text-red-500 w-full text-center text-xs">{error}</p>
        </form>
        <p className="text-sm text-center mt-2">
          Remember your password ?
          <Link to="/login" state={from} className="text-sm text-primary ml-2">
            Please login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
