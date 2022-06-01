import React from "react";
import useTitle from "../../../hooks/useTitle";
import Footer from "../../Shared/Footer/Footer";
import Banner from "../Banner/Banner";
import GetInTouch from "../GetInTouch/GetInTouch";
import Hero from "../Hero/Hero";
import OrderStep from "../OrderStep/OrderStep";
import Products from "../Products/Products";
import Reviews from "../Reviews/Reviews";
import Stats from "../Stats/Stats";
import Teams from "../Teams/Teams";

const Home = () => {
  useTitle("Home");
  return (
    <>
      <Banner></Banner>
      <Hero></Hero>
      <Products></Products>
      <Teams></Teams>
      <Reviews></Reviews>
      <OrderStep></OrderStep>
      <Stats></Stats>
      <GetInTouch></GetInTouch>
      <Footer></Footer>
    </>
  );
};

export default Home;
