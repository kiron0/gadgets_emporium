import React from "react";

const TItle = ({ title, subTitle }) => {
  return (
    <div className="title text-center py-10">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <span>{subTitle}</span>
      <div className="flex justify-center gap-1 my-1">
        <p className="w-20 h-1 bg-primary"></p>
      </div>
      <div className="flex justify-center gap-1 my-1">
        <p className="w-10 h-1 bg-primary"></p>
      </div>
      <div className="flex justify-center gap-1 my-1">
        <p className="w-3 h-1 bg-primary"></p>
      </div>
    </div>
  );
};

export default TItle;
