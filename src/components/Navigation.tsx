import React from "react";
import VirtaLogo from "../images/VirtaLogo";
import { currentTime } from "../utils/timeConverter";

const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <span className="logo">
          <VirtaLogo />
        </span>
        <div className="container">
          <span id="pageTitle">Buses arriving to</span>
        </div>
        <span id="currentTime">{currentTime()}</span>
      </div>
      <div className="clearFix"></div>
      <div className="container">
        <span className="busArrivalTitle">Buses arriving to</span>
      </div>
    </>
  );
};

export default Navigation;
