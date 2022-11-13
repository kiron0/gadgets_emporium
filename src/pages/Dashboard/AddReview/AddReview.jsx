import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ReactStars from "react-stars";
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
    <div className="px-6 py-6 w-full lg:w-[50%] mx-auto lg:mx-0">
      <div className="title">
        <h2 className="text-2xl font-semibold px-4">Add Review</h2>
      </div>
      <form
        onSubmit={handleAddReview}
        action=""
        className="p-4 md:p-10 shadow-lg rounded-xl mt-4"
      >
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
              className={`textarea w-full focus:outline-none `}
              placeholder="Put your feedback"
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
