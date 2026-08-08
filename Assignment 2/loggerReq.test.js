const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");

const PORT = 5000;
const FILE = path.resolve("users.json");
const REQLOG = path.resolve("req.json");

function logRequest(req) {
  let requests = [];

  if (fs.existsSync(REQLOG)) {
    const data = fs.readFileSync(REQLOG, "utf-8");

    if (data) {
      try {
        requests = JSON.parse(data);
      } catch (error) {
        console.error("Invalid JSON file");
      }
    }
  }

  requests.push(req);

  fs.writeFileSync(REQLOG, JSON.stringify(requests, null, 2));
}

const server = http.createServer((req, res) => {
  const reqData = {
    method: req.method,
    url: req.url,
    headers: req.headers,
  };

  logRequest(reqData);

  res.writeHead(200, {
    "Content-Type": "text/plain",
  });

  res.end("Request saved");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
