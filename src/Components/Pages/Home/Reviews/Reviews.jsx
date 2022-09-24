import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import Slider from "react-slick";
import TItle from "../../Shared/Title/Title";
import CardReview from "./CardReview";
import Loader from "../../Shared/Loader/Loader";
import { BASE_API } from "../../../../config";
const Reviews = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(`${BASE_API}/reviews`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(true);
        setReviews(result);
      });
  }, []);

  if (!reviews || reviews?.length === 0 || reviews?.length === undefined) {
    return <Loader />;
  }

  return (
    <>
      <section className="reviews py-20 px-8">
        <TItle
          title="Reviews by Customer"
          subTitle="What Customer say about us?"
        />
        <div className="container mx-auto">
          <Fade bottom distance="30px">
            {loading ? (
              <div className="reviews-content">
                <Slider {...settings}>
                  {reviews?.map((review) => (
                    <CardReview key={review._id} {...review} />
                  ))}
                </Slider>
              </div>
            ) : (
              <Loader />
            )}
          </Fade>
        </div>
      </section>
    </>
  );
};

export default Reviews;
