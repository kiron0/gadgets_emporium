import { sendPasswordResetEmail } from "firebase/auth";
import Fade from "react-reveal/Fade";
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
  const { register, handleSubmit } = useForm();
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
    <section className="container mx-auto bg-base-100 px-3 lg:px-10 py-3 lg:py-0">
      <div className="hero bg-base-100">
        <div className="flex justify-between items-center flex-col lg:flex-row-reverse">
          <Fade left distance="30px">
            <div className="w-full lg:w-1/2">
              <div className="flex flex-col justify-center items-center lg:px-12 md:my-24 lg:my-0">
                <div className="h-screen flex justify-center items-center px-0">
                  {sending && <Loading />}
                  <div className="w-full max-w-md py-12 px-16 rounded-2xl shadow-md">
                    <form
                      className="grid grid-cols-1 gap-y-4"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <p className="text-center w-full pb-4 font-semibold text-xl">
                        Reset your password
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
                      <p className="text-red-500 w-full text-center text-xs">
                        {error}
                      </p>
                    </form>
                    <p className="text-sm text-center mt-2">
                      Remember your password ?
                      <Link
                        to="/login"
                        state={from}
                        className="text-sm text-primary ml-2"
                      >
                        Please login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
          <Fade right distance="20px">
            <div className="w-full lg:w-1/2 rounded overflow-hidden lg:ml-6 hidden lg:block">
              <div className="outline-none h-full">
                <img
                  src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?w=826&t=st=1663080140~exp=1663080740~hmac=f1a8525dc6bc586cdbda6af34063f4ae0f90be2974d43e527d1818d652a580db"
                  className=" md:rounded-lg h-full w-full"
                  alt=""
                />
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
