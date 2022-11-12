import React, { useState } from "react";
import { BsArrowUpCircle } from "react-icons/bs";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 500) {
      setVisible(true);
    } else if (scrolled <= 500) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <span className="scroll-btn fixed cursor-pointer text-primary text-[2.5rem] w-100 z-[999] left-[84%] md:left-[91%] lg:left-[96%] bottom-[55px] md:bottom-[70px] h-[20px]">
      <BsArrowUpCircle
        className="hover:bg-primary duration-700 hover:text-white rounded-full"
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      />
    </span>
  );
};

export default ScrollButton;
