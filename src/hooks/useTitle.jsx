import { useContext, useEffect, useState } from "react";
import { InitializeContext } from "../App";

const useTitle = (titleText) => {
  const { appName } = useContext(InitializeContext);
  const [title, setTitle] = useState("");
  useEffect(() => {
    document.title = titleText + " - " + appName;
    setTitle(titleText);
  }, [titleText, appName]);
  return [title];
};

export default useTitle;
