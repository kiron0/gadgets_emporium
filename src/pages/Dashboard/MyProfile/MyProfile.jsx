import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { BiCamera } from "react-icons/bi";
import { useQuery } from "react-query";
import {
  browserName,
  fullBrowserVersion,
  osName,
  osVersion,
} from "react-device-detect";
import { BASE_API } from "../../../config";
import useTitle from "../../../hooks/useTitle";
import auth from "../../../auth/Firebase/Firebase.init";
import Loader from "../../../components/Loader/Loader";
import useScrollToTop from "../../../hooks/useScrollToTop";
import ImageChangeModal from "./ImageChangeModal";
import { PulseLoader } from "react-spinners";

const MyProfile = () => {
  useTitle("Profile");
  useScrollToTop();
  const [editProfile, setEditProfile] = useState(null);
  // const upload_api_key = `e1a6a4f77bc884f9b46b0d06d86c05e5`;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const profileData = {
      displayName: data.displayName,
      education: data?.education,
      number: data?.number,
      address: data?.address,
      facebook: data?.facebook,
      linkedin: data?.linkedin,
      createdAt: new Date().toDateString(),
    };
    await fetch(`${BASE_API}/users?uid=${auth?.currentUser?.uid}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          toast.success("Profile Updated Successfully");
          reset();
          refetch();
          setEditProfile(null);
        }
      });
  };

  const {
    data: result,
    isLoading,
    refetch,
  } = useQuery(["profileData", auth?.currentUser?.uid], () =>
    fetch(`${BASE_API}/users?uid=${auth?.currentUser?.uid}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading)
    return (
      <div className="md:p-80">
        <Loader />
      </div>
    );

  const {
    image,
    role,
    address,
    email,
    education,
    number,
    linkedin,
    facebook,
    displayName,
  } = result[0];

  return (
    <>
      <div className="lg:h-screen">
        <div className=" border-b-2 border-primary py-3">
          <h2 className="text-center text-2xl font-semibold ">Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-y-12 my-10 px-1 md:px-10">
          <div className="shadow-xl border-l-4 border-primary rounded-lg relative p-4 order-1 my-8 md:my-0">
            <h2 className="text-xl mb-4 px-4 font-bold">Your Information</h2>
            <label
              for="editProfile"
              className="btn btn-sm btn-primary btn-circle absolute right-2 top-2"
              onClick={() =>
                setEditProfile({
                  displayName,
                  number,
                  address,
                  education,
                  facebook,
                  linkedin,
                })
              }
            >
              <i className="bx bx-edit-alt text-white text-lg"></i>
            </label>
            <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4">
              <span>Name</span>
              <span>
                {displayName ? displayName : auth?.currentUser?.displayName}
              </span>
            </div>
            <hr className="border-dashed" />

            <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4">
              <span>Role</span>
              <span className="badge bg-primary border-primary text-white">
                {role === "admin" ? "Admin" : "User"}
              </span>
            </div>
            <hr className="border-dashed" />
            <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4">
              <span>Email</span>

              <span>{auth?.currentUser?.email}</span>
            </div>
            <hr className="border-dashed" />
            <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4">
              <span>Contact Number</span>

              <span>{number ? number : "Not Available"}</span>
            </div>
            <hr className="border-dashed" />
            <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4">
              <span>Address</span>

              <span>{address ? address : "Not Available"}</span>
            </div>
            <hr className="border-dashed" />
            <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4">
              <span>Used Browser</span>
              <span className="badge badge-primary text-white">
                {browserName} {fullBrowserVersion}
              </span>
            </div>
            <hr className="border-dashed" />
            <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4">
              <span>Used Device</span>
              <span className="badge badge-primary text-white">
                {osName} {osVersion}
              </span>
            </div>
            <hr className="border-dashed" />
            <div className="flex justify-center items-center py-4">
              <span>Social Links</span>
            </div>
            <div className="flex justify-center items-center px-4">
              {linkedin ? (
                <div className="flex items-center gap-2">
                  <a target="_blank" href={linkedin} rel="noreferrer">
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a target="_blank" href={facebook} rel="noreferrer">
                    <FaFacebook className="text-xl" />
                  </a>
                </div>
              ) : (
                <span className="label-text-alt">Not available</span>
              )}
            </div>
          </div>

          <div className="text-center md:order-1">
            <div className="avatar mx-auto border-4 border-primary p-3 rounded-full bg-base-100 shadow-xl">
              <div className=" w-60 rounded-full">
                {auth?.currentUser?.photoURL && !image ? (
                  <img src={auth?.currentUser?.photoURL} alt="profile" />
                ) : !auth?.currentUser?.photoURL && image ? (
                  <img src={image} alt="profile" />
                ) : (
                  <img
                    src="https://i.ibb.co/xY0rfV4/avatar.jpg"
                    alt="profile"
                  />
                )}
              </div>
              <label
                htmlFor="profile-image-edit-modal"
                className="profile-image-edit absolute right-1 bottom-9 text-lg cursor-pointer w-8 h-8 rounded-full grid place-items-center shadow bg-primary text-white "
              >
                <BiCamera />
              </label>
            </div>

            <h2 className="mt-4 font-bold text-xl">
              {displayName ? displayName : auth?.currentUser?.displayName}
            </h2>
            <small className="mt-4 font-bold">{auth?.currentUser?.email}</small>
          </div>
        </div>
        {editProfile && (
          <>
            <input type="checkbox" id="editProfile" className="modal-toggle " />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="another-info flex items-center justify-center flex-col gap-2 my-3"
                >
                  <div className="name border rounded p-3 relative w-full">
                    <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                      <h3 className="text-xs font-poppins">Full Name</h3>
                    </div>
                    <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 overflow-hidden">
                      <div className="icon">
                        <i className="bx bxs-hot"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="input focus:outline-none w-full"
                        required
                        defaultValue={
                          displayName || auth?.currentUser?.displayName
                        }
                        {...register("displayName", { required: true })}
                      />
                    </div>
                  </div>
                  {/* <div className="w-full">
                    <label className="label">
                      <span className="label-text-alt">Profile Image</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Profile Image Link"
                      className="input input-bordered w-full"
                      required
                      defaultValue={image}
                      {...register("profileUrl", { required: true })}
                    />
                  </div> */}

                  <div className="flex flex-col md:flex-row items-center gap-3 w-full mt-6">
                    <div className="name border rounded p-3 relative w-full">
                      <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                        <h3 className="text-xs font-poppins">Put your email</h3>
                      </div>
                      <div
                        className="input-group flex items-center my-2 border p-3 rounded-md mt-2 overflow-hidden
                      bg-base-200"
                      >
                        <div className="icon">
                          <i className="bx bx-message"></i>
                        </div>
                        <input
                          type="text"
                          placeholder="Phone Number"
                          defaultValue={email}
                          required
                          className="input focus:outline-none w-full bg-base-200"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="name border rounded p-3 relative w-full mt-6 md:mt-0">
                      <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                        <h3 className="text-xs font-poppins">Number</h3>
                      </div>
                      <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 overflow-hidden">
                        <div className="icon">
                          <i className="bx bxs-hot"></i>
                        </div>
                        <input
                          type="number"
                          placeholder="Phone Number"
                          defaultValue={number}
                          required
                          className="input focus:outline-none w-full"
                          {...register("number", { required: true })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="name border rounded p-3 relative w-full mt-6">
                    <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                      <h3 className="text-xs font-poppins">Address</h3>
                    </div>
                    <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 overflow-hidden">
                      <div className="icon">
                        <i className="bx bxs-hot"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Address"
                        className="input focus:outline-none w-full"
                        required
                        defaultValue={address}
                        {...register("address", { required: true })}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-3 w-full">
                    <div className="name border rounded p-3 relative w-full mt-6">
                      <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                        <h3 className="text-xs font-poppins">
                          Social Media Links
                        </h3>
                      </div>
                      <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 overflow-hidden">
                        <div className="icon">
                          <i className="bx bxl-linkedin"></i>
                        </div>
                        <input
                          type="link"
                          placeholder="LinkedIn Link"
                          defaultValue={linkedin}
                          className="input focus:outline-none w-full"
                          {...register("linkedin", { required: true })}
                        />
                        {errors.linkedin?.type === "required" && (
                          <span className="text-error">
                            LinkedIn URL is required
                          </span>
                        )}
                      </div>

                      <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 overflow-hidden">
                        <div className="icon">
                          <i className="bx bxl-facebook-circle"></i>
                        </div>
                        <input
                          type="text"
                          placeholder="Facebook Link"
                          defaultValue={facebook}
                          className="input focus:outline-none w-full"
                          {...register("facebook", { required: true })}
                        />
                        {errors.facebook?.type === "required" && (
                          <span className="text-error">
                            Facebook URL is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="modal-action">
                    <label htmlFor="editProfile" className="btn btn-warning">
                      <i className="bx bx-x text-xl"></i> Close
                    </label>
                    {/* <button
                      className="btn btn-primary text-white"
                      disabled={!loading && true}
                    >
                      {!loading ? "Updating Profile..." : "Update Profile"}
                    </button> */}
                    {isLoading ? (
                      <button className="btn btn-primary" type="button">
                        <PulseLoader size={8} color="#fff" />
                      </button>
                    ) : (
                      <button className="btn btn-success" type="submit">
                        <i className="bx bxs-pen text-lg"></i> Update Profile
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>

      <ImageChangeModal />
    </>
  );
};

export default MyProfile;
