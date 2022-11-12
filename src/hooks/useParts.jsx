import { useQuery } from "react-query";
import { BASE_API } from "../config";
import Loading from "../components/Loading/Loading";

const useParts = () => {
  const {
    data: parts,
    isLoading,
    refetch,
  } = useQuery("allParts", async () => {
    const res = await fetch(
      `${BASE_API}/parts?sort=1`,
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = await res.json();
    return data;
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return [parts, refetch];
};

export default useParts;
