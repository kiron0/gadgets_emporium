import React from "react";
import Swal from "sweetalert2";

const TeamCard = ({
  _id,
  image,
  membersName,
  position,
  education,
  refetch,
}) => {
  const handleTeamDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://gadgets-destination.herokuapp.com/teamMembers/${_id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            refetch();
            if (result.deletedCount) {
              Swal.fire(
                "Deleted!",
                "Team Members has been deleted.",
                "success"
              );
            }
          });
      }
    });
  };
  return (
    <div className="py-4 w-full">
      <div className="card w-100 bg-base-100 shadow-xl">
        <label
          onClick={() => handleTeamDelete(_id)}
          className="btn btn-sm btn-circle hover:bg-red-600 hover:border-red-600 text-white absolute right-2 top-2"
        >
          ✕
        </label>
        <figure className="px-10 pt-10">
          <img src={image} alt="" className="w-64 lg:w-72 mask mask-hexagon" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{membersName}</h2>
          <p>{education}</p>
          <div className="badge badge-outline mt-1 lg:mt-0">
            {position ? position : "Team Member"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
