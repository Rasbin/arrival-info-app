import * as React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import { arrivalQuery as ARRIVALS_QUERY } from "./api/arrivalsQuery";

interface Stop {
  name: string;
  routes: Array<{
    id: string;
    shortName: string;
  }>;
  stoptimesWithoutPatterns: Array<{
    arrivalDelay: number;
    realtimeArrival: number;
  }>;
}

const App: React.FC = () => {
  const [arrivals, setArrivals] = useState<Stop | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArrivals = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/arrivals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: ARRIVALS_QUERY }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.errors) {
          throw new Error(data.errors[0]?.message || "GraphQL error");
        }

        setArrivals(data.data.stop);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch arrivals";
        setError(errorMessage);
        console.error("Error fetching arrivals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArrivals();
  }, []);

  return (
    <div className="App">
      <Navigation />
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      {arrivals && <Dashboard arrivals={arrivals} />}
    </div>
  );
};

export default App;
