const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/proxy", async (req, res) => {
    console.log("🔹 Запрос получен:", req.body);  // Логируем запросы

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

        console.log("✅ Ответ от OpenAI:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("❌ Ошибка запроса к OpenAI:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Ошибка запроса к OpenAI", details: error.response ? error.response.data : error.message });
    }
});

app.listen(3000, () => console.log("🚀 Прокси-сервер работает на порту 3000"));
