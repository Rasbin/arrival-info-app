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
