import React, { useContext } from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { InitializeContext } from "../../../App";
import bannerImg from "../../../assets/banner.jpg";
import useScrollToTop from "../../../hooks/useScrollToTop";

const Banner = () => {
  useScrollToTop();
  const { appName } = useContext(InitializeContext);
  return (
    <section
      className="bg-base-100 body-font py-40"
      style={{ clipPath: `ellipse(300% 100% at 210.5% 0%)` }}
    >
      <div className="hero pb-80 md:pb-40 bg-base-100">
        <div className="hero-content flex-col justify-between lg:flex-row-reverse">
          <Fade right distance="20px">
            <div className="w-full lg:w-1/2 rounded overflow-hidden lg:ml-6">
              <div className="outline-none h-full">
                <img
                  src={bannerImg}
                  className=" md:rounded-lg h-full w-full"
                  alt=""
                />
              </div>
            </div>
          </Fade>
          <Fade left distance="30px">
            <div className="lg:w-1/2 pt-11 lg:pt-0 leading-loose">
              <span className="text-lg">
                We are <strong className="text-primary">{appName}</strong>.
              </span>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                We have the best Gadgets in our{" "}
                <span className="text-primary">{appName}</span>.
              </h1>
              <p className="py-6">
                We are most famous gadgets seller in the world. We already sold
                59 Countries around the world and give them satisfied customers.
                If you need any gadgets you will contact us.
              </p>
              <Link to="/shop" className="btn btn-primary text-white">
                Get Started
              </Link>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default Banner;
