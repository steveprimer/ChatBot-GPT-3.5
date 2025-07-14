const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
});

app.use("/chat", limiter); // apply to chat route

app.post("/chat", async (req, res) => {
  const { messages, storeInfo } = req.body;

  const systemMessage = {
    role: "system",
    content: `You are a helpful, concise AI support assistant for an Ecommerce brand. Only answer questions based on the store info provided. If unsure, politely guide the user to schedule a call or visit the website. Stay on topic and avoid unnecessary details.\n\n${storeInfo}`,
  };

  const fullMessages = [systemMessage, ...messages];

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: fullMessages, // ✅ Send full chat history
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI API error:", err.response?.data || err.message);

    res.status(500).send("Error generating response");
  }
});

// Health check route
app.get("/", (req, res) => res.send("GPT backend is live!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
