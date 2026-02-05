import React, { useEffect, useState } from "react";
import VirtaLogo from "../images/VirtaLogo";
import { currentTime } from "../utils/timeConverter";

const Navigation = () => {
  const [time, setTime] = useState(currentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(currentTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div data-testid="nav-test">
      <div className="navigation">
        <span className="logo" data-testid="virta-logo-test">
          <VirtaLogo />
        </span>
        <div className="container">
          <span id="pageTitle">Buses arriving to</span>
        </div>
        <span id="currentTime" data-testid="current-time-test">
          {time}
        </span>
      </div>
      <div className="clearFix"></div>
      <div className="container">
        <span className="busArrivalTitle">Buses arriving to</span>
      </div>
    </div>
  );
};

export default Navigation;
