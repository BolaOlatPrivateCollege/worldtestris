const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT });

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

console.log("Multiplayer server running on port 3000");
const http = require("http");

const server = http.createServer();
server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
