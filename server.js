const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

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
