import { createContext, useState } from "react";

const AllContext = createContext();

const Provider = ({ children }) => {
  const [loggedin, setloggedin] = useState(localStorage.getItem("token"));
  const [active, setactive] = useState("All");
  const [postid, setpostid] = useState("");
  const [slidedata, setslidedata] = useState([]);
  const [currentindex, setcurrentindex] = useState("");
  const valuetoshare = {
    loggedin,
    setloggedin,
    active,
    setactive,
    postid,
    setpostid,
    slidedata,
    setslidedata,
    currentindex,
    setcurrentindex,
  };
  return (
    <AllContext.Provider value={valuetoshare}>{children}</AllContext.Provider>
  );
};

export { Provider };
export default AllContext;
