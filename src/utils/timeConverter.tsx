/**
 * Convert seconds to HH:MM format
 */
export const secondsToHms = (seconds: number): string => {
  const numSeconds = Number(seconds);
  const hours = Math.floor(numSeconds / 3600);
  const minutes = Math.floor((numSeconds % 3600) / 60);
  const formattedMinutes = minutes < 10 ? `0${minutes}` : String(minutes);

  return `${hours}:${formattedMinutes}`;
};

/**
 * Convert seconds to human-readable time format (e.g., "2 hours 5 minutes")
 */
export const secondsToMinutes = (seconds: number): string => {
  const numSeconds = Number(seconds);
  const hours = Math.floor(numSeconds / 3600);
  const minutes = Math.floor((numSeconds % 3600) / 60) + 1; // Adding 1 minute considering time in seconds

  const hoursDisplay =
    hours > 0 ? `${hours}${hours === 1 ? " hour " : " hours "}` : "";
  const minutesDisplay =
    minutes > 0 ? `${minutes}${minutes === 1 ? " minute " : " minutes"}` : "";

  return `${hoursDisplay}${minutesDisplay}`;
};

/**
 * Get current time in HH:MM format
 */
export const currentTime = (): string => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : String(minutes);

  return `${hours}:${formattedMinutes}`;
};
