// const axios = require("axios");
// require("dotenv").config(); // to load your .env file if you use one

// async function testOpenAI() {
//   try {
//     const res = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: "Hello" }],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log("OpenAI response:", res.data.choices[0].message.content);
//   } catch (e) {
//     console.error("OpenAI API call failed:", e.response?.data || e.message);
//   }
// }

// testOpenAI();
