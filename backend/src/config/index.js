require("dotenv").config({ path: ".env" }); // Load environment variables from .env file

const node = {
  port: process.env.SERVER_PORT || 5000,
  environment: process.env.NODE_ENV,
};

const databaseUrl = process.env.DATABASE_URL

const config = {
  node,
  databaseUrl
};

module.exports = config;
