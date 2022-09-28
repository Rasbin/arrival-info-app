export const arrivalQuery = `
{
  stop(id: "HSL:1201110") {
  	name
    routes {
      id
      shortName
    }
    stoptimesWithoutPatterns {
      arrivalDelay
      realtimeArrival
    }
  }
}
`;
