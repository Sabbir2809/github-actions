import http from "node:http";
import { topics } from "./database.mjs";

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
        data: topics,
      }),
    );
  } else if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
    });

    res.end("Server Up and Running");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route Not Found ❌");
  }
});

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
