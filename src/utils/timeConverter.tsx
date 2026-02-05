export const secondsToHms = (d: number) => {
  d = Number(d);
  const h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let formattedm = m.toString();
  if (m < 10) {
    formattedm = "0" + m;
  }

  return h + ":" + formattedm;
};

export const secondsToMinutes = (d: number) => {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60) + 1; // Adding 1 minute considering time in seconds

  const hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
  const mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes / ") : "";

  return hDisplay + mDisplay;
};

export const currentTime = () => {
  let unformattedTime = new Date().getMinutes();
  let formattedTime = "";
  if (unformattedTime < 10) {
    formattedTime = "0" + unformattedTime;
  } else {
    formattedTime = unformattedTime.toString();
  }
  return new Date().getHours() + ":" + formattedTime;
};

/**
 * Calculate seconds since midnight for the current time
 */
export const getCurrentTimeInSeconds = (): number => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return hours * 3600 + minutes * 60 + seconds;
};

/**
 * Calculate waiting time in seconds between now and arrival time
 * @param realtimeArrivalInSec - Arrival time in seconds since midnight
 * @returns Waiting time in seconds
 */
export const calculateWaitingTimeInSeconds = (
  realtimeArrivalInSec: number,
): number => {
  const currentTimeInSec = getCurrentTimeInSeconds();

  return realtimeArrivalInSec > currentTimeInSec
    ? realtimeArrivalInSec - currentTimeInSec
    : 86400 - currentTimeInSec + realtimeArrivalInSec;
};
