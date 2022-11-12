import React from "react";
import TItle from "../../../components/Title/Title";
import useScrollToTop from "../../../hooks/useScrollToTop";

const Stats = () => {
  useScrollToTop();
  return (
    <section className="orderStep py-8 mb-20 px-6 md:px-0">
      <TItle
        title="Services Stats"
        subTitle="More Than 10 Years We Provide Services in the World"
      />
      <div className="lg:px-20">
        <div className="md:mt-14 mt-12 relative sm:flex items-center justify-center">
          <img
            src="https://i.ibb.co/KjrPCyW/map.png"
            alt="world"
            className="w-full xl:h-full h-96 object-fill sm:block hidden"
          />
          <img
            src="https://i.ibb.co/SXKj9Mf/map-bg.png"
            alt="mobile"
            className="sm:hidden -mt-10 block w-full h-96 object-fill absolute z-0"
          />

          <div className="shadow-lg xl:p-6 p-4 sm:w-auto w-full bg-primary sm:absolute relative z-20 mt-4 left-0 xl:ml-56 sm:ml-12 xl:-mt-40 sm:-mt-12 rounded-lg">
            <p className="text-3xl font-semibold text-white">65+</p>
            <p className="text-base leading-4 xl:mt-4 mt-2  text-white">
              Recently Products Listed
            </p>
          </div>
          <div className="shadow-lg xl:p-6 p-4 w-48 sm:w-auto bg-primary sm:absolute relative z-20 sm:mt-0 mt-4 xl:mt-80 xl:-ml-0 sm:-ml-12 rounded-lg">
            <p className="text-3xl font-semibold text-white">8K+</p>
            <p className="text-base leading-4 xl:mt-4 mt-2  text-white">
              Active Customers
            </p>
          </div>

          <div className="shadow-lg xl:p-6 p-4 w-48 sm:w-auto bg-primary sm:absolute relative z-20 mt-4 sm:mt-0  xl:-mt-80 xl:-ml-0 sm:-ml-12 rounded-lg">
            <p className="text-3xl font-semibold text-white">24000$</p>
            <p className="text-base leading-4 xl:mt-4 mt-2  text-white">
              Revenue
            </p>
          </div>

          <div className="shadow-lg xl:p-6 p-4 sm:w-auto w-full bg-primary  sm:absolute relative z-20 md:mt-0 sm:-mt-5 mt-4 right-0 xl:mr-56 sm:mr-24 rounded-lg">
            <p className="text-3xl font-semibold text-white">34+</p>
            <p className="text-base leading-4 xl:mt-4 mt-2 text-white">
              Total Got Awards
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
