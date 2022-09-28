import React, { useEffect } from "react";
import "./App.css";
import VirtaLogo from "./images/VirtaLogo";
import TransportItem from "./components/TransportItem";
import { currentTime } from "./utils/timeConverter";
import { arrivalQuery as ARRIVALS_QUERY } from "./api/arrivalsQuery";

const App = () => {
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

  return (
    <div className="App">
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
        <h1>{arrivals != null && arrivals.name}</h1>
        {arrivals != null && <TransportItem arrivals={arrivals} />}
      </div>
    </div>
  );
};

export default App;
