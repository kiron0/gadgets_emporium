import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ReactStars from "react-stars";
import { BASE_API } from "../../../config";
import useTitle from "../../../hooks/useTitle";
import auth from "../../../auth/Firebase/Firebase.init";
import useScrollToTop from "../../../hooks/useScrollToTop";
const AddReview = () => {
  useTitle("Add Review");
  useScrollToTop();
  const [rating, setRating] = useState(0);

  const handleAddReview = async (e) => {
    e.preventDefault();
    const reviewText = e.target.reviewText.value;
    const reviewData = {
      reviewText,
      rating,
      reviewDate: new Date().toDateString(),
      author: {
        name: auth?.currentUser?.displayName,
        uid: auth?.currentUser?.uid,
        photo: auth?.currentUser?.photoURL,
      },
    };
    if (rating && reviewText) {
      await fetch(`${BASE_API}/reviews`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.insertedId) {
            toast.success("Review added successfully");
            e.target.reset();
          }
        });
    } else {
      toast.error(`Provide Valid Information`);
    }
  };

  const [reviewError, setReviewError] = useState("");
  const handleReviewTextLimit = (e) => {
    const reviewText = e.target.value;
    if (reviewText.length === 250) {
      setReviewError(
        `Stop, ${auth?.currentUser?.displayName}! You have reached the limit 😃`
      );
    } else if (reviewText.length < 100) {
      setReviewError(
        `Hey, ${auth?.currentUser?.displayName}! Minimum 100 characters required 😋`
      );
    } else {
      setReviewError(null);
    }
  };

  return (
    <div className="px-6 py-6 w-100 lg:w-[50%] mx-auto lg:mx-0">
      <div className="title">
        <h2 className="text-2xl font-semibold px-4">Add Review</h2>
      </div>
      <form
        onSubmit={handleAddReview}
        action=""
        className="p-4 md:p-10 shadow-lg rounded mt-4"
      >
        <div>
          <textarea
            className={`textarea textarea-bordered w-full ${
              reviewError &&
              "border-error outline-error shadow-error focus:outline-error"
            }`}
            placeholder="Review Description"
            name="reviewText"
            maxLength={250}
            onChange={handleReviewTextLimit}
            style={{ resize: "none", height: "10rem" }}
          ></textarea>
          {reviewError && (
            <small className="block text-error">{reviewError}</small>
          )}
        </div>
        <div>
          <ReactStars
            count={5}
            onChange={setRating}
            size={34}
            color2={"#0E71F9"}
          />
        </div>
        <button className="btn btn-primary my-3 text-white">
          Send Feedback
        </button>
      </form>
    </div>
  );
};

export default AddReview;
