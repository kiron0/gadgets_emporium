import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { BiCheck, BiX } from "react-icons/bi";
import toast from "react-hot-toast";
import auth from "../../../auth/Firebase/Firebase.init";
import { BASE_API } from "../../../config";
import useAdmin from "../../../hooks/useAdmin";
import Loading from "../../../components/Loading/Loading";
import { InitializeContext } from "../../../App";
import useTitle from "../../../hooks/useTitle";
import useScrollToTop from "../../../hooks/useScrollToTop";

export default function Setting({ appChangeRefetch }) {
  useTitle("Setting");
  useScrollToTop();
  const { appName } = useContext(InitializeContext);
  const [user, isLoading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const [isEdit, setIsEdit] = useState(false);
  const { setValue } = useForm();
  const [input, setInput] = useState(appName);

  /* Handle Change App Name */
  const handleChangeAppName = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${BASE_API}/app/changeAppName`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ appName: input }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("App Name Changed Successfully");
            appChangeRefetch();
            setIsEdit(false);
          } else {
            toast.error(data.message);
          }
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setValue("appName", appName);
  }, [setValue, appName]);

  if (isLoading || adminLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <div className="p-5 my-4 bg-white font-poppins">
          <h3 className="text-2xl font-bold mb-3">Settings</h3>

          <div className="settings-content">
            {admin && (
              <div className="flex flex-col sm:flex-row items-center justify-between py-6 rounded my-4 bg-gray-50 px-5">
                <h2 className="text-xl font-bold pb-3 md:pb-0">
                  Change App Name
                </h2>
                <form
                  onSubmit={handleChangeAppName}
                  className="flex items-center gap-3"
                >
                  {isEdit ? (
                    <input
                      type="text"
                      onChange={(e) => setInput(e.target.value)}
                      defaultValue={appName}
                      placeholder="Change App Name"
                      className="input input-bordered input-sm"
                      autoComplete="off"
                    />
                  ) : (
                    <h2 className="text-xl">{appName}</h2>
                  )}

                  {isEdit ? (
                    <>
                      <button
                        type="submit"
                        className="cursor-pointer text-primary font-bold text-2xl"
                      >
                        <BiCheck />
                      </button>{" "}
                      <span
                        className="cursor-pointer text-error font-bold text-2xl"
                        onClick={() => setIsEdit(false)}
                      >
                        <BiX />
                      </span>
                    </>
                  ) : (
                    <span
                      className="cursor-pointer text-primary font-bold"
                      onClick={() => setIsEdit(true)}
                    >
                      <i className="bx bx-edit-alt text-xl"></i>
                    </span>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
