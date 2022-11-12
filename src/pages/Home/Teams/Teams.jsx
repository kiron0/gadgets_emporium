import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import { BASE_API } from "../../../config";
import Loader from "../../../components/Loader/Loader";
import TItle from "../../../components/Title/Title";
import CardTeam from "./CardTeam";
const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(`${BASE_API}/teams`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        setLoading(true);
      });
  }, []);

  if (!teams || teams?.length === 0 || teams?.length === undefined) {
    return <Loader />;
  }

  return (
    <section className="teams py-20 px-8 sm:px-0">
      <TItle
        title="Our Top Valuable Customers"
        subTitle="These are our top customers of this company."
      />
      <div className="container mx-auto">
        <Fade bottom distance="30px">
          {loading ? (
            <div className="teams-content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-8">
              {teams?.map((team) => (
                <CardTeam key={team._id} {...team} />
              ))}
            </div>
          ) : (
            <Loader />
          )}
        </Fade>
      </div>
    </section>
  );
};

export default Teams;
