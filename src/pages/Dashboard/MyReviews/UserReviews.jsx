import axios from "axios";
import React from "react";
import { BiTrash } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import auth from "../../../auth/Firebase/Firebase.init";
import Loading from "../../../components/Loading/Loading";
import { BASE_API } from "../../../config";

export default function UserReviews() {
  const {
    data: reviewsData,
    isLoading,
    refetch,
  } = useQuery("userReviews", async () => {
    const res = await axios.get(
      `${BASE_API}/reviews/user?uid=${auth?.currentUser?.uid}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return res?.data;
  });

  const handleReviewsDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_API}/reviews/${_id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            refetch();
            if (result.deletedCount) {
              Swal.fire("Deleted!", "Reviews has been deleted.", "success");
            }
          });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {/* Reviews Table */}
      <div className="overflow-x-auto my-8">
        {isLoading ? (
          <Loading />
        ) : reviewsData?.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Review ID</th>
                <th>Ratings</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviewsData.map((review, index) => (
                <tr key={review?._id}>
                  <th>{index + 1}</th>
                  <td>R-{review?._id.slice(0, 10)}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      {[0, 1, 2, 3, 4].map((stars, index) => (
                        <BsStarFill
                          key={index}
                          size="20"
                          color={stars < review?.rating ? "#80CED1" : "#C0C0C0"}
                        />
                      ))}
                    </div>
                  </td>
                  <td>
                    {review?.content?.length > 80
                      ? review?.content.slice(0, 80) + "..."
                      : review?.content}
                  </td>
                  <td>
                    <button
                      className="text-error ml-3"
                      onClick={() => handleReviewsDelete(review?._id)}
                    >
                      <BiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center"> No Reviews </div>
        )}
      </div>
    </div>
  );
}
