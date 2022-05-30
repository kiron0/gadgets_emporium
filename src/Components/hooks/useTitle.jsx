import { useEffect, useState } from "react";

const useTitle = (titleText) => {
  const [title, setTitle] = useState("");
  useEffect(() => {
    document.title = titleText + " - Gadgets Emporium ";
    setTitle(titleText);
  }, [titleText]);
  return [title];
};

export default useTitle;
