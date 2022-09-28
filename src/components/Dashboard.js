import React from "react";
import TransportItem from "../components/TransportItem";

const Dashboard = ({ arrivals }) => {
  return (
    <div className="container">
      <h1>{arrivals != null && arrivals.name}</h1>
      {arrivals != null && <TransportItem arrivals={arrivals} />}
    </div>
  );
};

export default Dashboard;
