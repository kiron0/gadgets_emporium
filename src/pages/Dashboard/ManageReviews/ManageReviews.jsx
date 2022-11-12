import React from "react";
import { useQuery } from "react-query";
import Loader from "../../../components/Loader/Loader";
import Fade from "react-reveal/Fade";
import ReviewsCard from "./ReviewsCard";
import { BASE_API } from "../../../config";
import useTitle from "../../../hooks/useTitle";
import useScrollToTop from "../../../hooks/useScrollToTop";

const ManageReviews = () => {
  useTitle("Manage Reviews");
  useScrollToTop();
  const {
    data: reviews,
    isLoading,
    refetch,
  } = useQuery(["reviews"], () =>
    fetch(`${BASE_API}/reviews`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (
    isLoading ||
    !reviews ||
    reviews?.length === 0 ||
    reviews?.length === undefined
  ) {
    return <Loader />;
  }

  return (
    <>
      <div className="title my-2 mb-6 p-4">
        <h3 className="text-2xl font-semibold">Manage Reviews</h3>
        <span>You can manage all the reviews which one reviewed by users</span>
      </div>
      <section className="reviews py-20">
        <div className="container mx-auto">
          <Fade bottom distance="30px">
            <div className="reviews-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {reviews?.map((review) => (
                <ReviewsCard key={review._id} {...review} refetch={refetch} />
              ))}
            </div>
          </Fade>
        </div>
      </section>
    </>
  );
};

export default ManageReviews;
