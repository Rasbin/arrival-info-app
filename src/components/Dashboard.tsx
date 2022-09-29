import React from "react";
// @ts-expect-error
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
  arrivals: Arrival
}

const Dashboard:React.FC<DashboardProps> = ({arrivals}) => {
  const transportItem = () => {
    const alertClass = (delay: boolean) => {
      if (delay) {
        return "alertColor alertColorDelayed";
      } else {
        return "alertColor alertColorOnTime";
      }
    };

    return arrivals.stoptimesWithoutPatterns.map((item) => {
      const currentDateTime = new Date();
      const currentHourIn24Hr = currentDateTime
        .getHours()
        .toLocaleString("en-US", {
          // @ts-expect-error
          hour12: false,
        });

      const currentMinutes = currentDateTime.getMinutes();
      const currentSeconds = currentDateTime.getSeconds();

      const currentTimeInSec =
        Number(currentHourIn24Hr) * 60 * 60 + currentMinutes * 60 + currentSeconds;

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
      {/* @ts-expect-error */}
      {arrivals != null && transportItem(arrivals)}
    </div>
  );
};

export default Dashboard;
