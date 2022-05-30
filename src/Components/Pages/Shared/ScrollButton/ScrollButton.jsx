import React, { useState } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import "./ScrollButton.css";

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
    <span className="scroll-btn">
      <BsArrowUpCircle
        className="hover:bg-primary hover:text-white rounded-full"
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      />
    </span>
  );
};

export default ScrollButton;
