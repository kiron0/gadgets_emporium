import React from "react";
import { useQuery } from "react-query";
import { Fade } from "react-reveal";
import { BASE_API } from "../../../config";
import useTitle from "../../../hooks/useTitle";
import Loading from "../../../components/Loading/Loading";
import UserRow from "./UserRow";
import useScrollToTop from "../../../hooks/useScrollToTop";

const AllUsers = () => {
  useTitle("Manage All Users");
  useScrollToTop();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch(`${BASE_API}/users/all`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="lg:px-10 py-0 md:py-8 bg-base-100 rounded-md pb-12">
      <div className="title my-2 mb-10">
        <h3 className="text-2xl font-semibold">Manage Users</h3>
        <span>You can manage all the users whom are already registered</span>
      </div>
      <Fade top distance="20px">
        <div className="overflow-x-auto shadow-xl rounded-xl">
          <table className="table w-full">
            <thead className="bg-base-300">
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Make Admin</th>
                <th>Remove Admin</th>
                <th>Role</th>
                <th>isLogin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <UserRow
                  index={index}
                  key={user._id}
                  user={user}
                  refetch={refetch}
                ></UserRow>
              ))}
            </tbody>
          </table>
        </div>
      </Fade>
    </div>
  );
};

export default AllUsers;
