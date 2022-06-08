import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { useQuery } from "react-query";
import useTitle from "../../../hooks/useTitle";
import auth from "../../Shared/Firebase/Firebase.init";
import Loader from "../../Shared/Loader/Loader";

const MyProfile = () => {
  useTitle("Profile");
  const [isShow, setIsShow] = useState(false);
  const upload_api_key = `e1a6a4f77bc884f9b46b0d06d86c05e5`;
  const [isFile, setIsFile] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [loading, setLoading] = useState("false");
  const onSubmit = (data) => {
    setLoading(false);
    if (!isFile) {
      const url = `https://api.imgbb.com/1/upload?key=${upload_api_key}`;

      const formData = new FormData();
      const image = data.profileImage[0];
      formData.append("image", image);

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.success) {
            saveProfileDataOnMongodb(result?.data?.url, data);
            setLoading(true);
          }
        });
    } else {
      const inputURL = data.imageUrl;
      saveProfileDataOnMongodb(inputURL, data);
      setLoading(true);
    }
  };

  const saveProfileDataOnMongodb = async (image, data) => {
    const profileData = {
      education: data?.education,
      number: data?.number,
      address: data?.address,
      facebook: data?.facebook,
      linkedin: data?.linkedin,
      image: image,
      createdAt: new Date().toDateString(),
    };
    await fetch(`http://localhost:5000/users?uid=${auth?.currentUser?.uid}`, {
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
          setIsShow(false);
        }
      });
  };

  const {
    data: result,
    isLoading,
    refetch,
  } = useQuery(["profileData", auth?.currentUser?.uid], () =>
    fetch(`http://localhost:5000/users?uid=${auth?.currentUser?.uid}`, {
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

  const { image, role, address, education, number, linkedin, facebook } =
    result[0];

  return (
    <div className="grid place-items-center py-20 md:px-5 lg:px-5">
      <div className="profile-card w-[97%] md:w-2/3 lg:w-1/3 text-center shadow-lg rounded-lg bg-base-100 p-7">
        <div className="avatar w-40 h-40 rounded-full border-8 text-7xl font-semibold overflow-hidden mt-[-5rem] z-10 grid place-items-center mx-auto ring ring-primary ring-offset-base-100 ring-offset-2">
          {auth?.currentUser?.photoURL ? (
            <img
              src={auth?.currentUser?.photoURL}
              alt={auth?.currentUser?.displayName}
            />
          ) : (
            <img src={image} alt={auth?.currentUser?.displayName} />
          )}
        </div>
        <div className="info my-2">
          <h3 className="text-lg font-semibold">
            {auth?.currentUser?.displayName}
            <small className="ml-2">
              {role === "admin" ? (
                <span className="badge bg-primary border-primary text-white">
                  Admin
                </span>
              ) : (
                <span className="badge text-white">User</span>
              )}
            </small>
          </h3>
          <small>{auth?.currentUser?.email}</small>
        </div>
        <hr />
        <div className="details py-5">
          <ul className="flex flex-col gap-3 items-start justify-start">
            <li className="flex justify-between w-full items-center">
              Education -{" "}
              <strong>{education ? education : "Not available"}</strong>
            </li>
            <li className="flex justify-between w-full items-center">
              Phone - <strong>{number ? number : `Not available`}</strong>
            </li>
            <li className="flex w-full justify-between items-center">
              Address - <strong>{address ? address : "Not available"}</strong>
            </li>
            <li className="flex justify-between w-full items-center">
              Social Links -{" "}
              {facebook || linkedin ? (
                <div className="flex items-center gap-2">
                  <a target={"_blank"} href={linkedin} rel="noreferrer">
                    <FaLinkedin />
                  </a>
                  <a target={"_blank"} href={facebook} rel="noreferrer">
                    <FaFacebook />
                  </a>
                </div>
              ) : (
                <strong>Not available</strong>
              )}
            </li>
          </ul>
          {isShow ? (
            <button
              onClick={() => setIsShow((prev) => !prev)}
              className="btn btn-link"
            >
              Close
            </button>
          ) : (
            <button
              onClick={() => setIsShow((prev) => !prev)}
              className="btn btn-link"
            >
              Edit
            </button>
          )}
        </div>
        {isShow && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="another-info flex items-center justify-center  flex-col gap-2 my-3"
          >
            <input
              type="text"
              placeholder="Education"
              className="input input-bordered w-full"
              required
              defaultValue={education}
              {...register("education", { required: true })}
            />
            {errors.education?.type === "required" && (
              <span className="text-error">Education is required</span>
            )}
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              required
              defaultValue={number}
              {...register("number", { required: true })}
            />
            {errors.number?.type === "required" && (
              <span className="text-error">Number is required</span>
            )}
            <input
              type="text"
              placeholder="City/State"
              className="input input-bordered w-full"
              required
              defaultValue={address}
              {...register("address", { required: true })}
            />
            {errors.address?.type === "required" && (
              <span className="text-error">Address is required</span>
            )}
            <input
              type="text"
              placeholder="LinkedIn Account Link"
              className="input input-bordered w-full"
              required
              defaultValue={linkedin}
              {...register("linkedin", { required: true })}
            />
            {errors.linkedin?.type === "required" && (
              <span className="text-error">LinkedIn is required</span>
            )}
            <input
              type="text"
              placeholder="Facebook Account Link"
              className="input input-bordered w-full"
              required
              defaultValue={facebook}
              {...register("facebook", { required: true })}
            />
            {errors.facebook?.type === "required" && (
              <span className="text-error">Facebook is required</span>
            )}
            <label htmlFor="file" className="my-2 block">
              Image
              <button
                type="button"
                className="btn btn-xs mx-2 text-white"
                onClick={() => setIsFile((prev) => !prev)}
              >
                {isFile ? "Upload" : "URL"}
              </button>
            </label>
            {isFile ? (
              <input
                type="url"
                className="input input-bordered w-full"
                placeholder="Put Your Image Link"
                id="file"
                {...register("imageUrl", { required: true })}
              />
            ) : (
              <input
                type="file"
                className="block border p-2 w-full rounded"
                id="file"
                {...register("profileImage", { required: true })}
              />
            )}
            {errors.profileImage?.type === "required" ||
              (errors.imageUrl?.type === "required" && (
                <span className="text-error">
                  Product Image Field is required
                </span>
              ))}
            <div className="text-center mt-3">
              <button
                className="btn btn-primary text-white"
                disabled={!loading && true}
              >
                {!loading ? "Updating Profile..." : "Update Profile"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
