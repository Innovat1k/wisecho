import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FAVQS_API = process.env.FAVQS_API_URL;
const FAVQS_API_KEY = process.env.FAVQS_API_KEY;

app.use(cors());
app.use(express.json());

const FAVQS_HEADERS = {
  Authorization: `Token token="${FAVQS_API_KEY}"`,
};

// Route : Quote of the day
app.get("/api/qotd", async (req, res) => {
  try {
    const response = await fetch(`${FAVQS_API}/qotd`, {
      headers: FAVQS_HEADERS,
    });
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Erreur lors de la récupération du QOTD." });
  }
});

// Route : Quotes list with filter
app.get("/api/quotes", async (req, res) => {
  const { filter, type = "tag", page = 1 } = req.query;

  let url = `${FAVQS_API}/quotes?page=${page}`;
  if (filter) url += `&filter=${encodeURIComponent(filter)}&type=${type}`;

  try {
    const response = await fetch(url, {
      headers: FAVQS_HEADERS,
    });
    const data = await response.json();
    res.json(data);
  } catch {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des citations." });
  }
});

// Route : Random quote from the first 25
app.get("/api/quotes/random", async (req, res) => {
  try {
    const response = await fetch(`${FAVQS_API}/quotes?page=1`, {
      headers: FAVQS_HEADERS,
    });
    const data = await response.json();

    const quotes = data.quotes || [];
    const randomQuote =
      quotes.length > 0
        ? quotes[Math.floor(Math.random() * quotes.length)]
        : null;

    if (randomQuote) {
      res.json(randomQuote);
    } else {
      res.status(404).json({ error: "Aucune citation trouvée." });
    }
  } catch {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération aléatoire." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy backend en ligne sur http://localhost:${PORT}`);
});
