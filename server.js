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
                    "Authorization": `Bearer ${process.env.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}`,
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
