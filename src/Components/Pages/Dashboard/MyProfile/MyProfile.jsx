import { useState } from "react";
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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const education = e.target.education.value;
    const number = e.target.number.value;
    const address = e.target.address.value;
    const linkedin = e.target.linkedin.value;
    const facebook = e.target.facebook.value;
    const data = { education, number, address, linkedin, facebook };
    await fetch(`http://localhost:5000/users?uid=${auth?.currentUser?.uid}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          toast.success("Profile Updated Successfully");
          e.target.reset();
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

  const { role, address, education, number, linkedin, facebook } = result[0];

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
            auth?.currentUser?.displayName?.slice(0, 1)
          )}
        </div>
        <div className="info my-2">
          <h3 className="text-lg font-semibold">
            {auth?.currentUser?.displayName}
          </h3>
          <small>{auth?.currentUser?.email}</small>
          <small className="ml-2">
            {role === "admin" ? (
              <span className="badge bg-primary border-primary text-white">
                Admin
              </span>
            ) : (
              <span className="badge text-white">User</span>
            )}
          </small>
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
            onSubmit={handleUpdateProfile}
            className="another-info flex items-center justify-center  flex-col gap-2 my-3"
          >
            <input
              type="text"
              placeholder="Education"
              name="education"
              className="input input-bordered w-full"
              required
              defaultValue={education}
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="number"
              className="input input-bordered w-full"
              required
              defaultValue={number}
            />
            <input
              type="text"
              placeholder="City/State"
              name="address"
              className="input input-bordered w-full"
              required
              defaultValue={address}
            />
            <input
              type="text"
              placeholder="LinkedIn Account Link"
              name="linkedin"
              className="input input-bordered w-full"
              required
              defaultValue={linkedin}
            />
            <input
              type="text"
              placeholder="Facebook Account Link"
              name="facebook"
              className="input input-bordered w-full"
              required
              defaultValue={facebook}
            />
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
                name="file"
                className="input input-bordered w-full"
                placeholder="Put Your Image Link"
                id="file"
              />
            ) : (
              <input
                type="file"
                name="file"
                className="block border p-2 w-full rounded"
                id="file"
              />
            )}
            <div className="text-center mt-3">
              <button className="btn btn-primary text-white">
                Update Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
