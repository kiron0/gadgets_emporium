import React from "react";
import Fade from "react-reveal/Fade";
const TItle = ({ title, subTitle }) => {
  return (
    <div className="title text-center py-10">
      <Fade bottom distance="10px">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <span>{subTitle}</span>
      </Fade>
      <div className="flex justify-center gap-1 my-2">
        <p className="w-20 h-1 bg-primary"></p>
        <p className="w-5 h-1 bg-primary"></p>
        <p className="w-3 h-1 bg-primary "></p>
      </div>
    </div>
  );
};

export default TItle;
