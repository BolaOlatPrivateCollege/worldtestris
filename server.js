const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;

// Create HTTP server (REQUIRED for Render)
const server = http.createServer();

// Attach WebSocket to HTTP server
const wss = new WebSocket.Server({ server });

let players = [];

wss.on("connection", (ws) => {
  console.log("Player connected");
  players.push(ws);

  ws.on("message", (msg) => {
    players.forEach(p => {
      if (p !== ws && p.readyState === WebSocket.OPEN) {
        p.send(msg);
      }
    });
  });

  ws.on("close", () => {
    console.log("Player disconnected");
    players = players.filter(p => p !== ws);
  });
});

// Start server properly
server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
