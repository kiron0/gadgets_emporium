import React from "react";
import Fade from "react-reveal/Fade";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Loading from "../../../components/Loading/Loading";
import useToken from "../../../hooks/useToken";
import toast from "react-hot-toast";
import auth from "../../../auth/Firebase/Firebase.init";
import useScrollToTop from "../../../hooks/useScrollToTop";
import useTitle from "../../../hooks/useTitle";

const SignUp = () => {
  useScrollToTop();
  useTitle("Sign Up");
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [token] = useToken(user || gUser);
  const navigate = useNavigate();

  let signInError;

  if (loading || gLoading || updating) {
    return <Loading></Loading>;
  }

  if (error || gError || updateError) {
    signInError = (
      <p className="text-red-500">
        <small>
          {error?.message || gError?.message || updateError?.message}
        </small>
      </p>
    );
  }

  if (token) {
    navigate("/", { replace: true });
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    toast.success(`Welcome ${data.name}! You are now registered.`);
  };
  return (
    <section className="container mx-auto bg-base-100 px-3 lg:px-10 py-3 lg:py-0">
      <div className="hero bg-base-100">
        <div className="flex justify-between items-center flex-col lg:flex-row-reverse">
          <Fade left distance="30px">
            <div className="w-full lg:w-1/2">
              <div className="flex flex-col justify-center items-center lg:px-12 md:my-24 lg:my-0">
                <div className="flex h-screen justify-center items-center w-full">
                  <div className="card w-full bg-base-100 shadow-md max-w-lg">
                    <div className="card-body w-full px-16">
                      <h2 className="text-center text-2xl font-semibold">
                        Create an account
                      </h2>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-sm">
                          <label className="label">
                            <span className="label-text">Name</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full max-w-sm"
                            {...register("name", {
                              required: {
                                value: true,
                                message: "Name is Required",
                              },
                            })}
                          />
                          <label className="label">
                            {errors.name?.type === "required" && (
                              <span className="label-text-alt text-red-500">
                                {errors.name.message}
                              </span>
                            )}
                          </label>
                        </div>

                        <div className="form-control w-full max-w-sm">
                          <label className="label">
                            <span className="label-text">Email</span>
                          </label>
                          <input
                            type="email"
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
                            type="password"
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
                          className="btn w-full max-w-sm text-white btn-primary"
                          type="submit"
                          value="Sign Up"
                        />
                      </form>
                      <p className="text-center font-semibold">
                        <small>
                          Already have an account?{" "}
                          <Link className="text-primary" to="/login">
                            Login
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

export default SignUp;
