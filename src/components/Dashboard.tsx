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
      if (delay) {
        return "alertColor alertColorDelayed";
      } else {
        return "alertColor alertColorOnTime";
      }
    };

    return arrivals.stoptimesWithoutPatterns.map((item) => {
      const waitingTimeInSec = calculateWaitingTimeInSeconds(
        item.realtimeArrival,
      );
      const waitingTimeInMin = secondsToMinutes(waitingTimeInSec);
      const waitingTimeText = "In " + waitingTimeInMin;
      const timeInHrAndMin = secondsToHms(item.realtimeArrival);
      const delay = item.arrivalDelay > 0 ? true : false;
      const delayInMin = secondsToMinutes(item.arrivalDelay);

      const delayText = " (" + delayInMin + " minutes late)";

      return (
        <div className="transportItem flexContainer" key={item.realtimeArrival}>
          <span className={alertClass(delay)}></span>
          <div>
            <img src={busIcon} alt="bus" width="22px" height="17px" />
            {arrivals.routes.map((publicTransportNumber) => (
              <span
                className="transportItemName"
                key={publicTransportNumber.id}
              >
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

  return (
    <div className="container">
      <h1>{arrivals != null && arrivals.name}</h1>
      {arrivals != null && transportItem()}
    </div>
  );
};

export default Dashboard;
