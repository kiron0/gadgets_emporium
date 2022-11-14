import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Rating } from "react-simple-star-rating";
import { BASE_API } from "../../../config";
import useTitle from "../../../hooks/useTitle";
import auth from "../../../auth/Firebase/Firebase.init";
import useScrollToTop from "../../../hooks/useScrollToTop";
import { useAuthState } from "react-firebase-hooks/auth";
import useUserInfo from "../../../hooks/useUserInfo";
import Loading from "../../../components/Loading/Loading";

const AddReview = () => {
  useTitle("Add Review");
  useScrollToTop();
  const [user, isLoading] = useAuthState(auth);
  const [userInfo] = useUserInfo(user);
  const [rating, setRating] = useState(0);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

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
        photo: userInfo?.image || auth?.currentUser?.photoURL,
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
      toast.error(
        `Hey, ${auth?.currentUser?.displayName}! Please fill all the fields`
      );
    }
  };

  const [reviewError, setReviewError] = useState("");

  const handleReviewTextLimit = (e) => {
    const reviewText = e.target.value;
    if (reviewText.length === 250) {
      setReviewError(
        `Stop, ${auth?.currentUser?.displayName}! You have reached the limit 😃`
      );
    } else if (reviewText.length === 0) {
      setReviewError("");
    } else if (reviewText.length < 100) {
      setReviewError(
        `Hey, ${auth?.currentUser?.displayName}! Minimum 100 characters required 😋`
      );
    } else {
      setReviewError(null);
    }
    const reviewTextLength = reviewText.length;
    document.getElementById("reviewTextLength").innerText =
      100 - reviewTextLength + " characters left";
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <form onSubmit={handleAddReview} className="p-4 my-5 bg-white">
        <div className="review-content">
          <div>
            <div className="form-control">
              <label htmlFor="title" className="label">
                Ratings
              </label>

              <Rating
                className="flex items-center"
                onClick={ratingChanged}
                showTooltip
                tooltipArray={[
                  "Terrible",
                  "Bad",
                  "Average",
                  "Great",
                  "Prefect",
                ]}
              />
            </div>
            <div className="name border rounded p-3 relative mt-10">
              <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                <h3 className="text-xs font-poppins select-none">
                  Put your feedback
                </h3>
              </div>
              <div
                className={`input-group flex items-center my-2 border p-3 rounded-md mt-2 ${
                  reviewError && "border-error shadow-error outline-error"
                }`}
              >
                <div className="icon">
                  <i className="bx bxs-pen"></i>
                </div>
                <textarea
                  className="textarea w-full focus:outline-none"
                  placeholder="Put your review"
                  name="reviewText"
                  maxLength={250}
                  onChange={handleReviewTextLimit}
                  style={{ resize: "none", height: "10rem" }}
                ></textarea>
              </div>
            </div>
            {reviewError && (
              <small className="flex flex-col pt-2 text-error">
                {reviewError}
                <span id="reviewTextLength"></span>
              </small>
            )}
            <div className="my-3">
              <button className="btn btn-success text-white">
                Save Review
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
