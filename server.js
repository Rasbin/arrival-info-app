const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Root endpoint to verify server is running
app.get("/", (req, res) => {
  res.json({
    message: "Arrival Info App - Backend Proxy Server",
    status: "running",
    endpoints: {
      health: "GET /health",
      api: "POST /api/arrivals",
    },
    note: "This is the backend API server. Open http://localhost:3000 in your browser to use the app.",
  });
});

// Mock data for demonstration (Digitransit API now requires paid subscription)
const mockArrivalsData = {
  data: {
    stop: {
      name: "Kampintori",
      routes: [
        { id: "HSL:1004", shortName: "1" },
        { id: "HSL:1005", shortName: "2" },
        { id: "HSL:1006", shortName: "3" },
      ],
      stoptimesWithoutPatterns: [
        {
          arrivalDelay: 0,
          realtimeArrival: 57600, // 16:00:00
        },
        {
          arrivalDelay: 120,
          realtimeArrival: 57720, // 16:02:00 (2 min delay)
        },
        {
          arrivalDelay: -30,
          realtimeArrival: 57900, // 16:05:00 (30 sec early)
        },
        {
          arrivalDelay: 0,
          realtimeArrival: 58200, // 16:10:00
        },
        {
          arrivalDelay: 60,
          realtimeArrival: 58500, // 16:15:00 (1 min delay)
        },
      ],
    },
  },
};

// Proxy endpoint for Digitransit API
app.post("/api/arrivals", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    console.log("📤 Processing arrival data request...");
    console.log(
      "⚠️  Note: Using mock data (Digitransit API requires paid subscription)",
    );

    // Add a small delay to simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("✅ Successfully returning mock arrival data");
    res.json(mockArrivalsData);
  } catch (error) {
    console.error("❌ Error processing request:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
