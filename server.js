const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Proxy endpoint for DigiTransit API
const API_URL =
  "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql/";

app.post("/api/arrivals", async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch from DigiTransit API" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching from DigiTransit API:", error.message);
    res.status(500).json({ error: "Failed to fetch data from API" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Proxy server running on http://localhost:${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/health`);
});
