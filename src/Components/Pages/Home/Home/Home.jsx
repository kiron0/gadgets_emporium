import React from "react";
import Footer from "../../Shared/Footer/Footer";
import Banner from "../Banner/Banner";
import Hero from "../Hero/Hero";
import OrderStep from "../OrderStep/OrderStep";
import Teams from "../Teams/Teams";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Hero></Hero>
      <Teams></Teams>
      <OrderStep></OrderStep>
      <Footer></Footer>
    </>
  );
};

export default Home;
