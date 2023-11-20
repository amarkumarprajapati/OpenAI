const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { OpenAI } = require("openai");

dotenv.config();
const app = express();

const openai = new OpenAI({
  apiKey: "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",
});

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from the server",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k-0613",
      prompt: `${prompt}`,
      messages: [
        {
          role: "user",
          content: "",
        },
      ],
      temperature: 1,
      max_tokens: 5000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
