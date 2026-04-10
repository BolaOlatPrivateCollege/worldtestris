const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;
const server = http.createServer();
const wss = new WebSocket.Server({ server });

let players = [];

wss.on("connection", (ws) => {
  players.push(ws);

  ws.on("message", (msg) => {
    players.forEach(p => {
      if (p !== ws && p.readyState === WebSocket.OPEN) {
        p.send(msg);
      }
    });
  });

  ws.on("close", () => {
    players = players.filter(p => p !== ws);
  });
});

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
