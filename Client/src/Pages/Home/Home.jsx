import React from "react";
import style from "./Home.module.css";
import TopNavbar from "../../Components/TopNavbar/TopNavbar";
import Categorybar from "../../Components/Categorybar/Categorybar";
function Home() {
  return (
    <div>
      <TopNavbar />
      <Categorybar/>
    </div>
  );
}

export default Home;
