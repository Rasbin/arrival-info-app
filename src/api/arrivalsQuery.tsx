/**
 * GraphQL query to fetch arrival information for a specific bus stop
 * Stop ID: HSL:1201110 - Sörnäinen metro station
 */
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
