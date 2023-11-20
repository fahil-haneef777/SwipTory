import { createContext, useState } from "react";

const AllContext = createContext();

const Provider = ({ children }) => {
  const [loggedin, setloggedin] = useState(localStorage.getItem('token'));
  const valuetoshare = {
    loggedin,
    setloggedin,
  };
  return (
    <AllContext.Provider value={valuetoshare}>{children}</AllContext.Provider>
  );
};

export { Provider };
export default AllContext;
