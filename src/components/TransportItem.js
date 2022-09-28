import React from "react";
import busIcon from "../images/bus.png";
import { secondsToHms, secondsToMinutes } from "../utils/timeConverter";

const transportItem = ({ arrivals }) => {
  const alertClass = (delay) => {
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
      <div className="transportItem flexContainer" key={item.realtimeArrival}>
        <span className={alertClass(delay)}></span>
        <div>
          <img src={busIcon} alt="bus" width="22px" height="17px" />
          {arrivals.routes.map((publicTransportNumber) => (
            <span className="transportItemName" key={publicTransportNumber.id}>
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

export default transportItem;
