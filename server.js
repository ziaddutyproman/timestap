// server.js
const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for all origins
app.use(cors());

// Serve static files from the public directory
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Timestamp API endpoint
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;
  let parsedDate;

  // No date provided: use current time
  if (!date) {
    parsedDate = new Date();
  } else {
    // If date is only digits, treat it as a UNIX timestamp
    if (/^\d+$/.test(date)) {
      parsedDate = new Date(parseInt(date));
    } else {
      parsedDate = new Date(date);
    }
  }

  // Check for invalid date
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return valid date in both formats
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Timestamp Microservice is running on port ${PORT}`);
});
