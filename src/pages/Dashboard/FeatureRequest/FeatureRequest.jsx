import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { BiUser } from "react-icons/bi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import auth from "../../../auth/Firebase/Firebase.init";
import { InitializeContext } from "../../../App";
import FeatureRequestEditor from "./FeatureRequestEditor";
import Loading from "../../../components/Loading/Loading";
import { BASE_API } from "../../../config";
import useAdmin from "../../../hooks/useAdmin";

export default function FeatureRequest() {
  const { appName } = useContext(InitializeContext);
  const [user, isLoading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const navigate = useNavigate();
  const [isReadonly, setIsReadonly] = useState(true);
  const { register, handleSubmit, setValue } = useForm();
  const [requestText, setRequestText] = useState("");

  /* Handle Feature Bugs */
  const handleFeatureBugs = handleSubmit(async (formData) => {
    if (!requestText || !formData?.subject) {
      return toast.error("All Fields are required.");
    }
    const sendingData = {
      ...formData,
      requestText,
      author: {
        name: user?.displayName,
        email: user?.email,
        role: admin ? "admin" : "user",
      },
    };

    try {
      await fetch(`${BASE_API}/app/sendFeatureRequest`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(sendingData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setRequestText("");
            toast.success(data?.message);
            navigate("/dashboard/profile");
          } else {
            toast.error(data?.message);
          }
        });
    } catch (error) {
      console.log(error?.message, error);
    }
  });

  useEffect(() => {
    setValue("subject", isReadonly ? "Request for Features & Bugs" : "");
  }, [isReadonly, setValue]);

  if (isLoading || adminLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="p-5 my-4 bg-white">
        <div className="title">
          <h3 className="text-2xl font-bold">Feature Request & Bugs</h3>
          <p className="text-sm text-gray-500 my-2">
            If you got any bugs to browsing our {appName} Please let me know to
            fill up below form and also can send us with your creative features
            which one you think to putting our web app much better then now.
          </p>
        </div>
        <form onSubmit={handleFeatureBugs}>
          {/* Name */}
          <div className="name border  rounded p-3 relative mt-10 flex-1">
            <div className="name-title absolute -top-4 bg-white border rounded p-1">
              <h3 className="text-xs font-poppins">
                {!isReadonly ? "Put your subject" : "Default Subject"}
              </h3>
            </div>
            <div
              className={`input-group flex items-center my-2 border p-3 rounded-md mt-2 ${
                isReadonly ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div className="icon">
                <BiUser />
              </div>
              <input
                type="text"
                className={`form-control outline-none pl-4 w-full ${
                  isReadonly ? "bg-gray-100" : "bg-white"
                }`}
                placeholder="Subject For"
                readOnly={isReadonly}
                {...register("subject", { required: true })}
              />
              <button
                className=" w-32 bg-white p-1 rounded-full overflow-hidden font-poppins text-xs"
                type="button"
                onClick={() => setIsReadonly((state) => !state)}
              >
                {!isReadonly ? "Set Default" : "Put your own"}
              </button>
            </div>
          </div>
          {/* End */}
          <div
            className="name border  rounded p-3 pb-1 relative mt-10 flex-1"
            style={{ height: 350 }}
          >
            <div className="name-title absolute -top-4 bg-white rounded p-1">
              <h3 className="text-xs font-poppins flex items-center gap-1 border p-1 rounded">
                Write Features & Bugs Issues
              </h3>
            </div>
            <div className="my-1 rounded-md mt-6">
              <FeatureRequestEditor setRequestText={setRequestText} />
            </div>
          </div>

          <div className="submit-btn mt-6">
            <button className="btn btn-success btn-md">Send Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}
