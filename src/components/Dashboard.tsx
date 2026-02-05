import React from "react";
import busIcon from "../images/bus.png";
import { secondsToHms, secondsToMinutes } from "../utils/timeConverter";

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

/**
 * Calculate the current time in seconds since midnight
 */
const getCurrentTimeInSeconds = (): number => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  return hours * 3600 + minutes * 60 + seconds;
};

/**
 * Calculate waiting time until arrival
 */
const calculateWaitingTime = (
  realtimeArrival: number,
  currentTime: number,
): number => {
  if (realtimeArrival > currentTime) {
    return realtimeArrival - currentTime;
  }
  // Next day calculation
  return 86400 - currentTime + realtimeArrival;
};

const getAlertClass = (isDelayed: boolean): string => {
  return isDelayed
    ? "alertColor alertColorDelayed"
    : "alertColor alertColorOnTime";
};

const Dashboard: React.FC<DashboardProps> = ({ arrivals }) => {
  const currentTimeInSec = getCurrentTimeInSeconds();

  const transportItems = arrivals.stoptimesWithoutPatterns.map((item) => {
    const waitingTimeInSec = calculateWaitingTime(
      item.realtimeArrival,
      currentTimeInSec,
    );
    const waitingTimeInMin = secondsToMinutes(waitingTimeInSec);
    const waitingTimeText = "In " + waitingTimeInMin;
    const timeInHrAndMin = secondsToHms(item.realtimeArrival);
    const isDelayed = item.arrivalDelay > 0;
    const delayInMin = secondsToMinutes(item.arrivalDelay);
    const delayText = isDelayed ? ` (${delayInMin}minutes late)` : "";

    return (
      <div className="transportItem flexContainer" key={item.realtimeArrival}>
        <span className={getAlertClass(isDelayed)}></span>
        <div>
          <img src={busIcon} alt="bus" width="22px" height="17px" />
          {arrivals.routes.map((publicTransportNumber) => (
            <span className="transportItemName" key={publicTransportNumber.id}>
              {publicTransportNumber.shortName}
              {delayText}
            </span>
          ))}
        </div>
        <span className="transportItemTime">
          {waitingTimeText}
          {timeInHrAndMin}
        </span>
      </div>
    );
  });

  return (
    <div className="container">
      <h1>{arrivals.name}</h1>
      {transportItems}
    </div>
  );
};

export default Dashboard;
