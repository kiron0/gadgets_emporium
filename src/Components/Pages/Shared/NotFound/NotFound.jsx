import React from "react";
import not_found from "../../../Assets/404.png";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <img src={not_found} alt="" />
    </div>
  );
};

export default NotFound;
