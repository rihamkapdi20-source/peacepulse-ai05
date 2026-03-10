// Import packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getAIResponse } = require("./ai"); // your AI logic in ai.js

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Allow requests from any domain
app.use(bodyParser.json()); // Parse JSON request body

// Test route for server check
app.get("/", (req, res) => {
  res.send("PeacePulse AI Backend Running 🌿");
});

// Chat route
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "No message provided" });
    }

    // Get AI response from ai.js
    const aiReply = await getAIResponse(userMessage);

    res.json({ reply: aiReply });
  } catch (error) {
    console.error("Error in /chat:", error);
    res.status(500).json({
      reply:
        "⚠️ Sorry, something went wrong on the server. Please try again later.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`PeacePulse backend running on port ${PORT}`);
});
