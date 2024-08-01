require("module-alias/register");

const http = require("http");
const app = require("./app");
const config = require("./src/config");
const { connectDB  } = require('./src/database/connection')

const { node } = config;

const server = http.createServer(app);

server.listen(node.port, async () => {
  console.log(`Server started on port ${node.port}.`)

  connectDB();
});
