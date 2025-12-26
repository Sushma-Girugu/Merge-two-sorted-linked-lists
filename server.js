const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/api/info", (req, res) => {
  res.json({
    algorithm: "Merge Two Sorted Linked Lists",
    steps: [
      "Compare heads of both lists",
      "Pick smaller node",
      "Move that list pointer",
      "Repeat comparison",
      "Attach remaining nodes"
    ]
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
