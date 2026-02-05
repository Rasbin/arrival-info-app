import * as React from "react";
import { useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import { arrivalQuery as ARRIVALS_QUERY } from "./api/arrivalsQuery";

const App = () => {
  const [arrivals, setArrivals] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchArrivals = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: ARRIVALS_QUERY }),
          },
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.errors) {
          throw new Error(data.errors[0]?.message || "Unknown GraphQL error");
        }

        setArrivals(data.data.stop);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch arrivals";
        console.error("Error fetching arrivals:", errorMessage);
        setError(errorMessage);
        setArrivals(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArrivals();
  }, []);

  return (
    <div className="App">
      <Navigation />
      {loading && <div className="loading">Loading bus arrivals...</div>}
      {error && <div className="error">Error: {error}</div>}
      {arrivals != null && !loading && <Dashboard arrivals={arrivals} />}
    </div>
  );
};

export default App;
