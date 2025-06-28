const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());

let clients = [];

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  clients.push(res);

  req.on("close", () => {
    clients = clients.filter(c => c !== res);
  });
});

app.post("/event", express.json(), (req, res) => {
  const data = req.body;

  clients.forEach(c => c.write(`data: ${JSON.stringify(data)}\n\n`));

  res.sendStatus(200);
});


app.listen(PORT, () => {
  console.log(`SSE Server corriendo en http://localhost:${PORT}`);
});
