const http = require("http");

const server = http.createServer((req, res) => {
  const now = new Date();
  const timeString = now.toISOString().split("T")[1].slice(0, -1);
  console.log(`${timeString} <== DATA RECEIVED`);

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    console.log(body);
    res.end("Got it");
  });
});

server.listen(8080, "0.0.0.0", () => {
  console.log("Listening for malware on port 8080...");
});
