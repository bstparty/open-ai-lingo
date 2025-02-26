const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/proxy", async (req, res) => {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            req.body,
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Ошибка запроса к OpenAI" });
    }
});

app.listen(3000, () => console.log("🚀 Прокси-сервер работает на порту 3000"));
