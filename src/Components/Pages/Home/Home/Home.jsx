import React from "react";
import Footer from "../../Shared/Footer/Footer";
import Banner from "../Banner/Banner";
import OrderStep from "../OrderStep/OrderStep";
import Teams from "../Teams/Teams";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Teams></Teams>
      <OrderStep></OrderStep>
      <Footer></Footer>
    </>
  );
};

export default Home;
