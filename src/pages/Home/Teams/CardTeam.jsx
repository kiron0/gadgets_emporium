import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";

const CardTeam = ({ image, name, designation }) => {
  return (
    <div className="card bg-base-100 shadow-lg">
      <figure className="px-10 pt-10 relative">
        <img src={image} alt="profile" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title mb-0 pb-0">{name}</h2>
        <p className="mb-0 text-sm uppercase">{designation}</p>
        <div className="card-actions">
          <div className="flex items-center gap-2 py-2">
            <button className="btn btn-square btn-sm">
              <FaFacebookF />
            </button>
            <button className="btn btn-square btn-sm">
              <BsTwitter />
            </button>
            <button className="btn btn-square btn-sm">
              <FaLinkedinIn />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTeam;
