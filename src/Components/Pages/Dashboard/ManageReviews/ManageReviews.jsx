import React from "react";
import { useQuery } from "react-query";
import Loader from "../../Shared/Loader/Loader";
import Fade from "react-reveal/Fade";
import ReviewsCard from "./ReviewsCard";

const ManageReviews = () => {
  const {
    data: reviews,
    isLoading,
    refetch,
  } = useQuery(["reviews"], () =>
    fetch(`http://localhost:5000/reviews`, {
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
      <section className="reviews py-20 px-6 sm:px-0">
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
