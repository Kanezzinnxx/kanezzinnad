const express = require("express");
const encryptCardData = require("./encrypt");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/encrypt", (req, res) => {
  const { pubkey, card, month, year, cvc } = req.query;
  if (!pubkey || !card || !month || !year || !cvc) {
    return res.status(400).json({ error: "Missing parameters" });
  }
  try {
    const encrypted = encryptCardData(card, month, year, cvc, pubkey);
    res.json({ encrypted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


