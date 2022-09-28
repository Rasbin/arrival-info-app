export const secondsToHms = (d) => {
  d = Number(d);
  const h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  if (m < 10) m = "0" + m;

  return h + ":" + m;
};

export const secondsToMinutes = (d) => {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60) + 1; // Adding 1 minute considering time in seconds

  const hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
  const mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes / ") : "";

  return hDisplay + mDisplay;
};

export const currentTime = () => {
  let formattedTime = new Date().getMinutes();
  if (formattedTime < 10) {
    formattedTime = "0" + formattedTime;
  }
  return new Date().getHours() + ":" + formattedTime;
};
