import React, { useEffect } from "react";
import "./App.css";
import busIcon from "./images/bus.png";
import VirtaLogo from "./images/VirtaLogo";

const ARRIVALS_QUERY = `
{
  stop(id: "HSL:1201110") {
  	name
    routes {
      id
      shortName
    }
    stoptimesWithoutPatterns {
      arrivalDelay
      realtimeArrival
    }
  }
}
`;

const transportItem = (arrivals) => {
  function alertClass(delay) {
    if (delay) {
      return "alertColor alertColorDelayed";
    } else {
      return "alertColor alertColorOnTime";
    }
  }

  function secondsToHms(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    if (m < 10) m = "0" + m;

    return h + ":" + m;
  }

  function secondsToMinutes(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60) + 1; // Adding 1 minute considering time in seconds

    const hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes / ") : "";

    return hDisplay + mDisplay;
  }

  return arrivals.stoptimesWithoutPatterns.map((item) => {
    const currentDateTime = new Date();
    const currentHourIn24Hr = currentDateTime
      .getHours()
      .toLocaleString("en-US", {
        hour12: false,
      });

    const currentMinutes = currentDateTime.getMinutes();
    const currentSeconds = currentDateTime.getSeconds();

    const currentTimeInSec =
      currentHourIn24Hr * 60 * 60 + currentMinutes * 60 + currentSeconds;

    const realtimeArrivalinSec = item.realtimeArrival;
    const waitingTimeInSec =
      realtimeArrivalinSec > currentTimeInSec
        ? realtimeArrivalinSec - currentTimeInSec
        : 86400 - currentTimeInSec + realtimeArrivalinSec;
    const waitingTimeInMin = secondsToMinutes(waitingTimeInSec);
    const waitingTimeText = "In " + waitingTimeInMin;
    const timeInHrAndMin = secondsToHms(realtimeArrivalinSec);
    const delay = item.arrivalDelay > 0 ? true : false;
    const delayInSec = item.arrivalDelay;
    const delayInMin = secondsToMinutes(delayInSec);

    const delayText = " (" + delayInMin + " minutes late)";

    return (
      <div className="transportItem flexContainer">
        <span className={alertClass(delay)}></span>
        <div>
          <img src={busIcon} alt="bus" width="22px" height="17px" />
          {arrivals.routes.map((publicTransportNumber) => (
            <span className="transportItemName">
              {publicTransportNumber.shortName}
              {delay && delayText}
            </span>
          ))}
        </div>
        <span className="transportItemTime">
          {waitingTimeText + timeInHrAndMin}
        </span>
      </div>
    );
  });
};

let currentTime = new Date().getHours() + ":" + new Date().getMinutes();

function App() {
  const [arrivals, setArrivals] = React.useState(null);

  useEffect(() => {
    fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ query: ARRIVALS_QUERY }),
    })
      .then((response) => response.json())
      .then((data) => setArrivals(data.data.stop));
  }, []);
  console.log("Arrivals: ", arrivals);
  return (
    <div className="App">
      <div className="navigation">
        <span className="logo">
          <VirtaLogo />
        </span>
        <div className="container">
          <span id="pageTitle">Buses arriving to</span>
        </div>
        <span id="currentTime">{currentTime}</span>
      </div>
      <div className="clearFix"></div>
      <div className="container">
        <span className="busArrivalTitle">Buses arriving to</span>
        <h1>{arrivals != null && arrivals.name}</h1>
        {arrivals != null && transportItem(arrivals)}
      </div>
    </div>
  );
}

export default App;
