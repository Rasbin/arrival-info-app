import React from "react";
import busIcon from "../images/bus.png";
import {
  secondsToHms,
  secondsToMinutes,
  calculateWaitingTimeInSeconds,
} from "../utils/timeConverter";

interface Route {
  id: string;
  shortName: string;
}

interface StopTimesWithoutPattern {
  arrivalDelay: number;
  realtimeArrival: number;
}

interface Arrival {
  name: string;
  routes: Route[];
  stoptimesWithoutPatterns: StopTimesWithoutPattern[];
}

interface DashboardProps {
  arrivals: Arrival;
}

const Dashboard: React.FC<DashboardProps> = ({ arrivals }) => {
  const transportItem = () => {
    const alertClass = (delay: boolean) => {
      return delay
        ? "alertColor alertColorDelayed"
        : "alertColor alertColorOnTime";
    };

    return arrivals.stoptimesWithoutPatterns.map((item, index) => {
      const waitingTimeInSec = calculateWaitingTimeInSeconds(
        item.realtimeArrival,
      );
      const waitingTimeInMin = secondsToMinutes(waitingTimeInSec);
      const timeInHrAndMin = secondsToHms(item.realtimeArrival);
      const delay = item.arrivalDelay > 0;
      const delayInMin = delay ? secondsToMinutes(item.arrivalDelay) : "";

      // Get the first route (bus number) for this arrival
      const busNumber = arrivals.routes[0]?.shortName || "-";

      return (
        <div className="transportItem" key={index}>
          <span className={alertClass(delay)}></span>
          <div className="transportItemContent">
            <div className="transportItemLeft">
              <img src={busIcon} alt="bus" width="22px" height="17px" />
              <span className="transportItemNumber">{busNumber}</span>
            </div>
            <div className="transportItemMiddle">
              {delay && (
                <span className="transportItemDelay">{delayInMin}</span>
              )}
              {!delay && <span className="transportItemOnTime">On time</span>}
            </div>
            <div className="transportItemRight">
              <span className="transportItemTime">{timeInHrAndMin}</span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <h1>{arrivals != null && arrivals.name}</h1>
      {arrivals != null && transportItem()}
    </div>
  );
};

export default Dashboard;
