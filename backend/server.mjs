import http from "node:http";
import { TOPICS } from "./data.mjs";

const port = 8080;

// Create HTTP server
const server = http.createServer((req, res) => {
  if (req.url === "/api/topics" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(
      JSON.stringify({
        success: true,
        message: "Get All Topics",
        data: TOPICS,
      }),
    );
  } else if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
    });

    res.end("Server up and running...");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route Not Found ❌");
  }
});

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
