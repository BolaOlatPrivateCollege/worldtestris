const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;
const server = http.createServer();
const wss = new WebSocket.Server({ server });

let players = [];

wss.on("connection", (ws) => {
  players.push(ws);
  console.log("Player connected:", players.length);

  ws.on("message", (msg) => {
    let data = JSON.parse(msg);

    // ✅ READY SYSTEM FIXED
    if (data.type === "ready") {
      if (players.length >= 2) {
        console.log("Starting game...");

        players.forEach(p => {
          if (p.readyState === WebSocket.OPEN) {
            p.send(JSON.stringify({ type: "start" }));
          }
        });
      }
      return;
    }

    // normal messages
    players.forEach(p => {
      if (p !== ws && p.readyState === WebSocket.OPEN) {
        p.send(msg);
      }
    });
  });

  ws.on("close", () => {
    players = players.filter(p => p !== ws);
    console.log("Player left:", players.length);
  });
});

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
