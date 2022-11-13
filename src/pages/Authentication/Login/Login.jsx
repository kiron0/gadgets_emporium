import React, { useContext, useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import auth from "../../../auth/Firebase/Firebase.init";
import useToken from "../../../hooks/useToken";
import useScrollToTop from "../../../hooks/useScrollToTop";
import useTitle from "../../../hooks/useTitle";
import { InitializeContext } from "../../../App";

const Login = () => {
  useScrollToTop();
  useTitle("Login");
  const { appName } = useContext(InitializeContext);
  const [showPassword, setShowPassword] = useState(false);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [token] = useToken(user || gUser);

  let signInError;
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
      toast.success(
        `Welcome Back to ${appName}, ${auth?.currentUser?.displayName}`,
        {
          autoClose: 4000,
        }
      );
    }
  }, [token, navigate, from, appName]);

  if (loading || gLoading) {
    return <Loading />;
  }

  if (error || gError) {
    signInError = (
      <p className="text-red-500">
        <small>{error?.message || gError?.message}</small>
      </p>
    );
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <section className="container mx-auto bg-base-100 px-3 lg:px-10 py-3 lg:py-0">
      <div className="hero bg-base-100">
        <div className="flex justify-between items-center flex-col lg:flex-row-reverse">
          <Fade left distance="30px">
            <div className="w-full lg:w-1/2">
              <div className="flex flex-col justify-center items-center lg:px-12 md:my-24 lg:my-0">
                <div className="flex h-screen justify-center items-center w-full max-w-md">
                  <div className="card w-full max-w-md bg-base-100 shadow-md">
                    <div className="card-body">
                      <h2 className="text-center text-2xl font-semibold">
                        Please Login
                      </h2>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-sm">
                          <label className="label">
                            <span className="label-text">Email</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full max-w-sm"
                            {...register("email", {
                              required: {
                                value: true,
                                message: "Email is Required",
                              },
                              pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: "Provide a valid Email",
                              },
                            })}
                          />
                          <label className="label">
                            {errors.email?.type === "required" && (
                              <span className="label-text-alt text-red-500">
                                {errors.email.message}
                              </span>
                            )}
                            {errors.email?.type === "pattern" && (
                              <span className="label-text-alt text-red-500">
                                {errors.email.message}
                              </span>
                            )}
                          </label>
                        </div>
                        <div className="form-control w-full max-w-sm">
                          <label className="label">
                            <span className="label-text">Password</span>
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="input input-bordered w-full max-w-sm"
                            {...register("password", {
                              required: {
                                value: true,
                                message: "Password is Required",
                              },
                              minLength: {
                                value: 6,
                                message: "Must be 6 characters or longer",
                              },
                            })}
                          />
                          <span
                            className="absolute right-12 justify-center items-center mt-12 text-xl cursor-pointer z-50"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <i className="bx bx-show-alt text-black"></i>
                            ) : (
                              <i className="bx bx-hide text-black"></i>
                            )}
                          </span>
                          <Link
                            to="/resetPassword"
                            className="text-xs text-secondary py-2 hover:text-primary font-semibold"
                          >
                            Forget password ?
                          </Link>
                          <label className="label">
                            {errors.password?.type === "required" && (
                              <span className="label-text-alt text-red-500">
                                {errors.password.message}
                              </span>
                            )}
                            {errors.password?.type === "minLength" && (
                              <span className="label-text-alt text-red-500">
                                {errors.password.message}
                              </span>
                            )}
                          </label>
                        </div>

                        {signInError}
                        <input
                          className="btn btn-primary w-full max-w-sm text-white"
                          type="submit"
                          value="Login"
                        />
                      </form>
                      <p className="text-center font-semibold">
                        <small>
                          Don't have an account?{" "}
                          <Link className="text-primary" to="/signUp">
                            Create New Account
                          </Link>
                        </small>
                      </p>
                      <div className="divider">OR</div>
                      <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline border-primary flex items-center content-center rounded-full hover:btn-primary"
                      >
                        <FcGoogle className="text-2xl mr-2"></FcGoogle>Continue
                        with Google
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
          <Fade right distance="20px">
            <div className="w-full lg:w-1/2 rounded overflow-hidden lg:ml-6 hidden lg:block">
              <div className="outline-none h-full">
                <img
                  src="https://i.ibb.co/DGmfNFs/auth.jpg"
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

export default Login;
