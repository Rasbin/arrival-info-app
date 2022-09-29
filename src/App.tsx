import * as React from "react";
import { useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
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
      <Navigation />
      {arrivals != null && <Dashboard arrivals={arrivals} />}
    </div>
  );
};

export default App;
